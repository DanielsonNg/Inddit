const { default: mongoose } = require("mongoose")
const { CommunitySchema } = require("../middlewares/ValidationBody")
const Category = require("../models/categories.model")
const Inddit = require("../models/inddits.model")
const Post = require("../models/post.model")
const Tracker = require("../models/tracker.model")
const cloudinary = require("../utils/cloudinary")
const Comment = require("../models/comments.model")
const { deleteCommentAndChildren } = require("../utils")
const User = require("../models/user.model")
const { permission } = require("../middlewares/ValidationBody/community")
const ObjectId = mongoose.Types.ObjectId

module.exports = {
    async createCommunity(req, res) {
        let logo
        let banner
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
            logo = await cloudinary.uploader.upload(data.logo, {
                folder: "Inddit"
            })
            banner = await cloudinary.uploader.upload(data.banner, {
                folder: "Inddit"
            })

            const create = await Inddit.create({
                name: data.name,
                description: data.description,
                banner: banner.secure_url,
                banner_public_id: banner.public_id,
                logo: logo.secure_url,
                logo_public_id: logo.public_id,
                category_id: category[0]._id,
                owner_id: data.user_id,
                join_approval: data.join_approval ? 1 : 0,
                post_approval: data.post_approval ? 1 : 0,
            })

            const track = await Tracker.create({ community_id: create._id, user_id: data.user_id, permission: 3 })

            return res.status(200).json({ data: create, track: track, msg: 'Community Successfully Created' })
        }
        catch (error) {
            console.log(error)
            if (logo) {
                await cloudinary.uploader.destroy(logo.public_id)
            }
            if (banner) {
                await cloudinary.uploader.destroy(banner.public_id)
            }
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
                if (community.join_approval === 0) {
                    const create = await Tracker.create({ community_id: req.params.id, user_id: req.body.user_id, permission: 1 })
                    return res.status(200).json({ create: create, is_join: 1 })
                }
                //need approval from admin/owner
                if (community.join_approval === 1) {
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
                        community_id: ObjectId.createFromHexString(req.params.id),
                        status: 1
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
                        createdAt: 1,
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
            return res.status(200).json(track)
        } catch (error) {
            console.log(error)
            return res.status(500)
        }

    },

    async deleteCommunity(req, res) {
        let logo
        let banner
        try {
            const posts = await Post.find({ community_id: req.params.id })
            if (posts.length > 0) {
                for (let post of posts) {
                    const comments = await Comment.find({ parent_id: post._id })
                    if (comments.length > 0) {
                        for (const comment of comments) {
                            await deleteCommentAndChildren(comment._id)
                        }
                    }
                    const postTemp = await Post.findById(post._id)
                    await cloudinary.uploader.destroy(postTemp.image_public_id)
                    const deletePost = await Post.findByIdAndDelete(post._id)
                }
            }
            const community = await Inddit.findById(req.params.id)
            await cloudinary.uploader.destroy(community.logo_public_id)
            await cloudinary.uploader.destroy(community.banner_public_id)
            const tracker = await Tracker.find({ community_id: req.params.id })
            if (tracker.length > 0) {
                for (let track of tracker) {
                    const deleteTrack = await Tracker.findByIdAndDelete(track._id)
                }
            }
            const deleteCommunity = await Inddit.findByIdAndDelete(req.params.id)

            return res.status(200).json(deleteCommunity)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: error })
        }
    },

    async editCommunity(req, res) {
        try {
            const { error } = CommunitySchema.edit.validate(req.body)
            const valid = error == null
            if (!valid) {
                return res.status(422).json({
                    response_message: error.message
                })
            }

            const id = req.params.id
            const data = req.body

            const communityTemp = await Inddit.findById(id)

            const updateFields = {
                description: data.description,
                join_approval: data.join_approval ? 1 : 0,
                post_approval: data.post_approval ? 1 : 0,
            }

            if (req.body.logo) {
                await cloudinary.uploader.destroy(communityTemp.logo_public_id)
                logo = await cloudinary.uploader.upload(data.logo, {
                    folder: 'Inddit'
                })
                updateFields.logo = logo.secure_url
                updateFields.logo_public_id = logo.public_id
            }
            if (req.body.banner) {
                await cloudinary.uploader.destroy(communityTemp.banner_public_id)
                banner = await cloudinary.uploader.upload(data.banner, {
                    folder: 'Inddit'
                })
                updateFields.banner = banner.secure_url
                updateFields.banner_public_id = banner.public_id
            }

            const community = await Inddit.findByIdAndUpdate(id, updateFields, { new: true })

            return res.status(200).json({ communityTemp })
        } catch (error) {
            if (logo) {
                await cloudinary.uploader.destroy(logo.public_id)
            }
            if (banner) {
                await cloudinary.uploader.destroy(banner.public_id)
            }
            console.log(error)
            return res.status(500).json(error)
        }
    },
    async membersToApprove(req, res) {
        try {
            const id = req.params.id
            const tracks = await Tracker.find({ community_id: id, permission: 0 })

            let members = []

            for (let track of tracks) {
                const member = await User.aggregate([
                    {
                        $match: {
                            _id: track.user_id,
                        }
                    },
                    {
                        $lookup: {
                            from: 'trackers',
                            localField: '_id',
                            foreignField: 'user_id',
                            as: 'tracker'
                        }
                    },
                    {
                        $match: {
                            'tracker.community_id': track.community_id,
                        }
                    },
                    {
                        $unwind: '$tracker'
                    },
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            image: 1,
                            'tracker.permission': 1,
                            'tracker._id': 1,
                            email: 1
                        }
                    },
                ])
                let role = ''
                switch (member[0].tracker.permission) {
                    case 0:
                        role = 'Requester'
                        break;
                    case 1:
                        role = 'Member'
                        break;
                    case 2:
                        role = 'Admin'
                        break;
                    case 3:
                        role = 'Owner'
                        break;
                }
                member[0].role = role
                members.push(member[0])
            }

            return res.status(200).json(members)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async getMembers(req, res) {
        try {
            const id = req.params.id
            const tracks = await Tracker.find({ community_id: id, permission: { $gt: 0 } })

            let members = []
            for (let track of tracks) {
                const member = await User.aggregate([
                    {
                        $match: {
                            _id: track.user_id,
                        }
                    },
                    {
                        $lookup: {
                            from: 'trackers',
                            localField: '_id',
                            foreignField: 'user_id',
                            as: 'tracker'
                        }
                    },
                    {
                        $match: {
                            'tracker.community_id': track.community_id,
                        }
                    },
                    {
                        $unwind: '$tracker'
                    },
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            image: 1,
                            'tracker.permission': 1,
                            'tracker._id': 1,
                            email: 1
                        }
                    },
                ])
                let role = ''
                switch (member[0].tracker.permission) {
                    case 0:
                        role = 'Requester'
                        break;
                    case 1:
                        role = 'Member'
                        break;
                    case 2:
                        role = 'Admin'
                        break;
                    case 3:
                        role = 'Owner'
                        break;
                }
                member[0].role = role
                members.push(member[0])
            }
            return res.status(200).json(members)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async promoteMember(req, res) {
        try {
            const id = req.params.id
            const trackUpdate = await Tracker.findByIdAndUpdate(id, { permission: 2 }, { new: 1 })
            return res.status(200).json(trackUpdate)

        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async demoteMember(req, res) {
        try {
            const id = req.params.id
            const trackUpdate = await Tracker.findByIdAndUpdate(id, { permission: 1 }, { new: 1 })
            return res.status(200).json(trackUpdate)

        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async kickMember(req, res) {
        try {
            const id = req.params.id
            const trackUpdate = await Tracker.findByIdAndDelete(id)
            return res.status(200).json('User Kicked Successfully')

        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async acceptMember(req, res) {
        try {
            const id = req.params.id
            const approve = await Tracker.findByIdAndUpdate(id, { permission: 1 }, { new: 1 })
            return res.status(200).json(approve)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },
    async getHotCommunity(req, res) {
        try {
            const result = await Tracker.aggregate([
                { $limit: 100 }, 
                {
                    $group: {
                        _id: "$community_id", 
                        count: { $sum: 1 },  // Count each occurrence of communityId
                    },
                },
                {
                    $project: {
                        communityId: "$_id",
                        count: 1,
                        _id: 0,
                    },
                },
            ]);

            return res.status(200).json(result)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

}