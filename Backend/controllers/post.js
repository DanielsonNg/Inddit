const { PostSchema } = require("../middlewares/ValidationBody")
const Post = require('../models/post.model')
const cloudinary = require('../utils/cloudinary')
const Inddit = require("../models/inddits.model")
const { default: mongoose } = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const Comment = require('../models/comments.model')
const { deleteCommentAndChildren } = require("../utils")
const Tracker = require('../models/tracker.model')
const LikeTracker = require('../models/likeTrackers.model')
const SaveTracker = require('../models/saveTrackers.model')

module.exports = {
    async createPost(req, res) {
        try {
            const data = req.body
            const { error } = PostSchema.create.validate(data)
            const valid = error == null
            if (!valid) {
                return res.status(422).json({
                    response_message: error.message
                })
            }

            //check if user joined community
            const track = await Tracker.findOne({ user_id: data.user_id, community_id: data.community_id })
            if (!track) {
                return res.status(401).json({
                    response_message: 'User Not Authorized to Create Post'
                })
            }

            let image

            const community = await Inddit.findOne({ _id: data.community_id })
            //upload cloudinary
            if (data.image.length > 0) {
                image = await cloudinary.uploader.upload(data.image, {
                    folder: 'Inddit'
                })
            }
            const create = await Post.create({
                title: data.title,
                description: data.content,
                image: data.image.length > 0 ? image.secure_url : null,
                image_public_id: data.image.length > 0 ? image.public_id : null,
                author_id: data.user_id,
                community_id: data.community_id,
                status: community.post_approval === 1 ? 0 : 1
            })

            return res.status(200).json(create)

        } catch (error) {
            console.log(error)
            return res.status(500).json("Internal Server Error")
        }
    },

    async getPosts(req, res) {
        try {
            const data = req.body

            const { error } = PostSchema.getAll.validate(data)
            const valid = error == null

            if (!valid) {
                return res.status(422).json({
                    response_message: error.message
                })
            }

            const pipeline = [
                {
                    $match: { status: 1 }
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
                    $unwind: "$community",          // Unwind the array to make communityInfo a single object
                    // preserveNullAndEmptyArrays: true // Keep posts even if no matches found
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
                    $lookup: {
                        from: "liketrackers",
                        localField: "_id",
                        foreignField: "post_id",
                        as: "liketracker"
                    }
                },
                {
                    $addFields: {
                        liketracker: {
                            $filter: {
                                input: "$liketracker",
                                as: "tr",
                                cond: {
                                    $eq: ["$$tr.user_id", ObjectId.createFromHexString(data.user_id)]
                                }
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: "savetrackers",
                        localField: "_id",
                        foreignField: "post_id",
                        as: "savetracker"
                    }
                },
                {
                    $addFields: {
                        savetracker: {
                            $filter: {
                                input: "$savetracker",
                                as: "sv",
                                cond: {
                                    $eq: ["$$sv.user_id", ObjectId.createFromHexString(data.user_id)]
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
                        createdAt: 1,
                        "community.logo": 1,
                        "community.description": 1,
                        "community.name": 1,
                        "author.username": 1,
                        "author._id": 1,
                        "category.name": 1,
                        "tracker.permission": 1,
                        comments: 1,
                        "liketracker": 1,
                        "savetracker": 1
                    }
                }
            ]
            if (data.category) {
                pipeline.push({
                    $match: {
                        "category.name": data.category
                    }
                })
            }
            
            const posts = await Post.aggregate(pipeline);
            return res.status(200).json(posts)
        } catch (error) {
            console.log(error)
            return res.status(500)
        }
    },

    async getPostsGuest(req, res) {
        try {
            const posts = await Post.aggregate([
                {
                    $lookup: {
                        from: "inddits",            // The collection to join
                        localField: "community_id",      // Field in the post collection (foreign key)
                        foreignField: "_id",            // Field in the community collection (primary key)
                        as: "community"             // Output array of matched documents from community
                    }
                },
                {
                    $unwind: "$community",          // Unwind the array to make communityInfo a single object
                    // preserveNullAndEmptyArrays: true // Keep posts even if no matches found
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
                    $project: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        likes: 1,
                        image: 1,
                        community_id: 1,
                        createdAt: 1,
                        "community.logo": 1,
                        "community.description": 1,
                        "community.name": 1,
                        "author.username": 1,
                        "category.name": 1,
                        "tracker.permission": 1,
                        comments: 1
                    }
                }
            ]);
            // console.log(posts)
            return res.status(200).json(posts)
        } catch (error) {
            console.log(error)
            return res.status(500)
        }
    },

    async getPost(req, res) {
        try {
            const id = req.params.id
            const data = req.body
            // console.log(data)
            const post = await Post.aggregate([
                {
                    $match: { _id: ObjectId.createFromHexString(id) }
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
                    $lookup: {
                        from: "liketrackers",
                        localField: "_id",
                        foreignField: "post_id",
                        as: "liketracker"
                    }
                },
                {
                    $addFields: {
                        liketracker: {
                            $filter: {
                                input: "$liketracker",
                                as: "tr",
                                cond: {
                                    $eq: ["$$tr.user_id", ObjectId.createFromHexString(data.user_id)]
                                }
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: "savetrackers",
                        localField: "_id",
                        foreignField: "post_id",
                        as: "savetracker"
                    }
                },
                {
                    $addFields: {
                        savetracker: {
                            $filter: {
                                input: "$savetracker",
                                as: "sv",
                                cond: {
                                    $eq: ["$$sv.user_id", ObjectId.createFromHexString(data.user_id)]
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
                        createdAt: 1,
                        "author._id": 1,
                        "community.logo": 1,
                        "community.description": 1,
                        "community.name": 1,
                        "author.username": 1,
                        "category.name": 1,
                        "tracker.permission": 1,
                        comments: 1,
                        "liketracker": 1,
                        "savetracker": 1
                    }
                },
            ]);
            // console.log(post)
            return res.status(200).json(post)
        } catch (error) {
            console.log(error)
            return res.status(500)
        }
    },

    async deletePost(req, res) {
        try {
            const id = req.params.id
            const comments = await Comment.find({ parent_id: id })
            if (comments.length > 0) {
                for (const comment of comments) {
                    await deleteCommentAndChildren(comment._id)
                }
            }
            const post = await Post.findById(id)
            await cloudinary.uploader.destroy(post.image_public_id)
            const deletePost = await Post.findByIdAndDelete(id)

            return res.status(200).json({ post: post, delete: deletePost, msg: 'Post Deleted Successfully' })
        } catch (error) {
            console.log(error)
            return res.status(500).json(error.message)
        }
    },

    async editPost(req, res) {
        try {
            const { error } = PostSchema.edit.validate(req.body)
            const valid = error == null
            if (!valid) {
                return res.status(422).json(
                    response_message = error.message
                )
            }
            const id = req.params.id
            const post = await Post.findByIdAndUpdate(id, { description: req.body.content }, { new: true })

            return res.status(200).json(post)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },


    async postsToApprove(req, res) {
        try {
            const data = req.body
            const posts = await Post.aggregate([
                {
                    $match: {
                        community_id: ObjectId.createFromHexString(req.params.id),
                        status: 0
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
                        comments: 1
                    }
                },
            ]);
            return res.status(200).json(posts)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async approvePost(req, res) {
        try {
            const id = req.params.id
            const approve = await Post.findByIdAndUpdate(id, { status: 1 })

            return res.status(200).json(approve)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async likePost(req, res) {
        try {
            const id = req.params.id
            const post = await Post.findByIdAndUpdate(id, { $inc: { likes: 1 } })
            const like = await LikeTracker.create({ post_id: id, user_id: req.body.user_id })
            return res.status(200).json(like)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async unlikePost(req, res) {
        try {
            const id = req.params.id

            const post = await Post.findByIdAndUpdate(id, { $inc: { likes: -1 } })
            const findLike = await LikeTracker.findOne({ post_id: id, user_id: req.body.user_id })
            const unlike = await LikeTracker.findByIdAndDelete(findLike._id)
            return res.status(200).json(unlike)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async getLike(req, res) {
        try {
            const id = req.params.id
            const findLike = await LikeTracker.findOne({ post_id: id, user_id: req.body.user_id })
            if (findLike) {
                return res.status(200).json({ like: true })
            }
            return res.status(200).json({ like: false })
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },
    async savePost(req, res) {
        try {
            const id = req.params.id
            const save = await SaveTracker.create({ post_id: id, user_id: req.body.user_id })
            return res.status(200).json(save)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async unsavePost(req, res) {
        try {
            const id = req.params.id
            const findSave = await SaveTracker.findOne({ post_id: id, user_id: req.body.user_id })
            const unSave = await SaveTracker.findByIdAndDelete(findSave._id)
            return res.status(200).json(unSave)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async getSave(req, res) {
        try {
            const id = req.params.id
            const findSave = await SaveTracker.findOne({ post_id: id, user_id: req.body.user_id })
            if (findSave) {
                return res.status(200).json({ saved: true })
            }
            return res.status(200).json({ saved: false })
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async getSavedPosts(req, res) {
        try {
            const id = req.params.id
            const findSave = await SaveTracker.find({ user_id: ObjectId.createFromHexString(id) })

            const postIds = []
            for (let save of findSave) {
                postIds.push(save.post_id)
            }

            const pipeline = [
                {
                    $match: {
                        _id: {
                            $in: postIds
                        }
                    }
                },
                {
                    $lookup: {
                        from: "inddits",
                        localField: "community_id",
                        foreignField: "_id",
                        as: "community"
                    }
                },
                {
                    $unwind: "$community",
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
                        from: "trackers",
                        localField: "community_id",
                        foreignField: "community_id",
                        as: "tracker"
                    }
                },
                {
                    $addFields: {
                        tracker: {
                            $filter: {
                                input: "$tracker",
                                as: "tr",
                                cond: {
                                    $eq: ["$$tr.user_id", ObjectId.createFromHexString(id)]
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
                        createdAt: 1,
                        "community.logo": 1,
                        "community.description": 1,
                        "community.name": 1,
                        "author.username": 1,
                        "author._id": 1,
                        "category.name": 1,
                        "tracker.permission": 1
                    }
                }
            ]
            const posts = await Post.aggregate(pipeline);
            return res.status(200).json(posts)
        } catch (error) {
            console.log(error)
            return res.status(500)
        }
    },

    async getLikedPosts(req, res) {
        try {
            const id = req.params.id
            const findLike = await LikeTracker.find({ user_id: ObjectId.createFromHexString(id) })

            const postIds = []
            for (let like of findLike) {
                postIds.push(like.post_id)
            }

            const pipeline = [
                {
                    $match: {
                        _id: {
                            $in: postIds
                        }
                    }
                },
                {
                    $lookup: {
                        from: "inddits",
                        localField: "community_id",
                        foreignField: "_id",
                        as: "community"
                    }
                },
                {
                    $unwind: "$community",
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
                        from: "trackers",
                        localField: "community_id",
                        foreignField: "community_id",
                        as: "tracker"
                    }
                },
                {
                    $addFields: {
                        tracker: {
                            $filter: {
                                input: "$tracker",
                                as: "tr",
                                cond: {
                                    $eq: ["$$tr.user_id", ObjectId.createFromHexString(id)]
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
                        createdAt: 1,
                        "community.logo": 1,
                        "community.description": 1,
                        "community.name": 1,
                        "author.username": 1,
                        "author._id": 1,
                        "category.name": 1,
                        "tracker.permission": 1
                    }
                }
            ]
            const posts = await Post.aggregate(pipeline);
            return res.status(200).json(posts)
        } catch (error) {
            console.log(error)
            return res.status(500)
        }
    },

    async getUserPosts(req, res) {
        try {
            const id = req.params.id

            const pipeline = [
                {
                    $match: {
                        author_id: ObjectId.createFromHexString(id)
                    }
                },
                {
                    $lookup: {
                        from: "inddits",
                        localField: "community_id",
                        foreignField: "_id",
                        as: "community"
                    }
                },
                {
                    $unwind: "$community",
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
                        from: "trackers",
                        localField: "community_id",
                        foreignField: "community_id",
                        as: "tracker"
                    }
                },
                {
                    $addFields: {
                        tracker: {
                            $filter: {
                                input: "$tracker",
                                as: "tr",
                                cond: {
                                    $eq: ["$$tr.user_id", ObjectId.createFromHexString(id)]
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
                        createdAt: 1,
                        "community.logo": 1,
                        "community.description": 1,
                        "community.name": 1,
                        "author.username": 1,
                        "author._id": 1,
                        "category.name": 1,
                        "tracker.permission": 1
                    }
                }
            ]
            const posts = await Post.aggregate(pipeline);
            return res.status(200).json(posts)
        } catch (error) {
            console.log(error)
            return res.status(500)
        }
    },

    async getHotPosts(req, res) {

        try {
            const id = req.params.id
            const data = req.body

            const oneMonthAgo = new Date()
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

            const post = await Post.aggregate([
                {
                    $match: {
                        status: 1,
                        createdAt: { $gte: oneMonthAgo }
                    }
                },
                {
                    $lookup: {
                        from: "inddits",
                        localField: "community_id",
                        foreignField: "_id",
                        as: "community"
                    }
                },
                {
                    $unwind: "$community"
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
                        from: "trackers",
                        localField: "community_id",
                        foreignField: "community_id",
                        as: "tracker"
                    }
                },
                {
                    $addFields: {
                        tracker: {
                            $filter: {
                                input: "$tracker",
                                as: "tr",
                                cond: {
                                    $eq: ["$$tr.user_id", ObjectId.createFromHexString(data.user_id)]
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
                        createdAt: 1,
                        "author._id": 1,
                        "community.logo": 1,
                        "community.description": 1,
                        "community.name": 1,
                        "author.username": 1,
                        "category.name": 1,
                        "tracker.permission": 1,
                        comments: 1
                    }
                },
                {
                    $sort: {
                        likes: -1
                    }
                },
                {
                    $limit: 100
                }
            ]);

            return res.status(200).json(post)
        } catch (error) {
            console.log(error)
            return res.status(500)
        }
    },

    async getPostsByCategory(req, res) {
        try {
            const data = req.body
            const categoryId = req.params.id
            const { error } = PostSchema.getAll.validate(data)
            const valid = error == null

            if (!valid) {
                return res.status(422).json({
                    response_message: error.message
                })
            }

            const pipeline = [
                {
                    $match: {
                        status: 1,
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
                    $unwind: "$community",          // Unwind the array to make communityInfo a single object
                    // preserveNullAndEmptyArrays: true // Keep posts even if no matches found
                },
                {
                    $match: {
                        'community.category_id': ObjectId.createFromHexString(categoryId)
                    }
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
                        createdAt: 1,
                        "community.logo": 1,
                        "community.description": 1,
                        "community.name": 1,
                        "author.username": 1,
                        "author._id": 1,
                        "category.name": 1,
                        "tracker.permission": 1
                    }
                }
            ]
            const posts = await Post.aggregate(pipeline);
            return res.status(200).json(posts)
        } catch (error) {
            console.log(error)
            return res.status(500)
        }
    }
}