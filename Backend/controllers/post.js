const { PostSchema } = require("../middlewares/ValidationBody")
const Post = require('../models/post.model')
const cloudinary = require('../utils/cloudinary')
const User = require('../models/user.model')
const Inddit = require("../models/inddits.model")
const { default: mongoose } = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const Comment = require('../models/comments.model')
const { deleteCommentAndChildren } = require("../utils")
const Tracker = require('../models/tracker.model')
// const community = require("./community")

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
                community_id: data.community_id
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
                    $project: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        likes: 1,
                        image: 1,
                        community_id: 1,
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

            // console.log(posts)
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
                        "community.logo": 1,
                        "community.description": 1,
                        "community.name": 1,
                        "author.username": 1,
                        "category.name": 1,
                        "tracker.permission": 1,
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
                    $project: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        likes: 1,
                        image: 1,
                        community_id: 1,
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

            return res.status(200).json({post:post, delete:deletePost, msg: 'Post Deleted Successfully' })
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
}