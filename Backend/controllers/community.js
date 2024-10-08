const { default: mongoose } = require("mongoose")
const { CommunitySchema } = require("../middlewares/ValidationBody")
const Category = require("../models/categories.model")
const Inddit = require("../models/inddits.model")
const Post = require("../models/post.model")
const Tracker = require("../models/tracker.model")
const cloudinary = require("../utils/cloudinary")
const ObjectId = mongoose.Types.ObjectId

module.exports = {
    async createCommunity(req, res) {
        try {
            const data = req.body
            const { error } = CommunitySchema.create.validate(data)
            const valid = error == null
            if (!valid) {
                return res.status(422).json({
                    response_message: error.message
                })
            }
            const find = await Inddit.find({ name: data.name })
            if (find.length > 0) {
                return res.status(422).json({
                    response_message: 'Community Already Exist'
                })
            }

            const category = await Category.find({ name: data.category })
            const logo = await cloudinary.uploader.upload(data.logo, {
                folder: "Inddit"
            })
            const banner = await cloudinary.uploader.upload(data.banner, {
                folder: "Inddit"
            })

            const create = await Inddit.create({
                name: data.name,
                description: data.description,
                banner: banner.secure_url,
                logo: logo.secure_url,
                category_id: category[0]._id,
                owner_id: data.user_id,
                auto_join: data.auto_join,

            })

            const track = await Tracker.create({ community_id: create._id, user_id: data.user_id, permission: 3 })

            return res.status(200).json({ data: create, track: track, msg: 'Community Successfully Created' })
        }
        catch (error) {
            console.log(error)
            return res.status(500).json({ msg: error.message })
        }

    },

    async getCommunities(req, res) {
        try {
            const communities = await Inddit.find({}, { _id: 1, name: 1 })
            return res.status(200).json(communities)
        } catch (error) {
            console.log(error)
            return res.status(500)
        }
    },

    async getCommunity(req, res) {
        try {
            const data = req.params
            const { error } = CommunitySchema.find.validate(data)
            const valid = error == null
            if (!valid) {
                return res.status(422).json({
                    response_message: error.message
                })
            }
            const community = await Inddit.findById(data.id)
            return res.status(200).json(community)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: 'Data Not Found' })
        }
    },

    async joinCommunity(req, res) {
        try {
            const { error } = CommunitySchema.join.validate(req.body)
            const valid = error == null
            if (!valid) {
                return res.status(422).json({
                    response_message: error.message
                })
            }
            const track = await Tracker.findOne({ community_id: req.params.id, user_id: req.body.user_id })
            const community = await Inddit.findById(req.params.id)
            if (!track) {
                //auto join
                if(community.auto_join === 1){
                    const create = await Tracker.create({ community_id: req.params.id, user_id: req.body.user_id, permission: 1 })
                    return res.status(200).json({ create: create, is_join: 1 })
                }
                //need approval from admin/owner
                if(community.auto_join === 0){
                    const create = await Tracker.create({ community_id: req.params.id, user_id: req.body.user_id, permission: 0 })
                    return res.status(200).json({ create: create, is_join: 0 })
                }
            } else {
                return res.status(500)
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async leaveCommunity(req, res) {
        try {
            const { error } = CommunitySchema.leave.validate(req.body)
            const valid = error == null
            if (!valid) {
                return res.status(422).json({
                    response_message: error.message
                })
            }
            const track = await Tracker.findOne({ community_id: req.params.id, user_id: req.body.user_id })
            if (track) {
                const del = await Tracker.findByIdAndDelete(track._id)
                return res.status(200).json({ del: del, is_join: 0 })
            } else {
                return res.status(500)
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async getPostsByCommunity(req, res) {
        try {
            const data = req.body
            const posts = await Post.aggregate([
                {
                    $match: {
                        community_id: ObjectId.createFromHexString(req.params.id)
                    }
                },
                {
                    $lookup: {
                        from: "inddits",            // The collection to join
                        localField: "community_id",      // Field in the post collection (foreign key)
                        foreignField: "_id",            // Field in the community collection (primary key)
                        as: "community"             // Output array of matched documents from community
                    }
                },
                {
                    $unwind: "$community"          // Unwind the array to make communityInfo a single object
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "author_id",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {
                    $unwind: "$author"
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "community.category_id",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $unwind: "$category",
                },
                {
                    $lookup: {
                        from: "trackers", // The name of the Tracker collection
                        localField: "community_id", // Field from Post model
                        foreignField: "community_id", // Field from Tracker model
                        as: "tracker" // Output array field for matches
                    }
                },
                {
                    // Add a conditional field to filter the tracker data based on user_id
                    $addFields: {
                        tracker: {
                            $filter: {
                                input: "$tracker",        // The tracker array to filter
                                as: "tr",                 // Alias for each element in the array
                                cond: {
                                    $eq: ["$$tr.user_id", ObjectId.createFromHexString(data.user_id)] // Filter by user_id
                                }
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        likes: 1,
                        image: 1,
                        community_id: 1,
                        owner_id: 1,
                        "author._id": 1,
                        "community.logo": 1,
                        "community.description": 1,
                        "community.name": 1,
                        "author.username": 1,
                        "category.name": 1,
                        "tracker.permission": 1,
                    }
                },
            ]);
            return res.status(200).json(posts)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async getPermission(req, res) {
        try {
            const data = req.body
            const { error } = CommunitySchema.permission.validate(data)
            const valid = error == null
            if (!valid) {
                return res.status(422).json({
                    response_message: error.message
                })
            }
            const track = await Tracker.findOne({ user_id: data.user_id, community_id: data.community_id })
            // if (track) {
            //     // console.log('tracked')
            //     return res.status(200).json({ permission: 1 })
            // } else {
            //     // console.log('leave')
            //     return res.status(200).json({ permission: 0 })
            // }
            return res.status(200).json(track)
        } catch (error) {
            console.log(error)
            return res.status(500)
        }

    }

}