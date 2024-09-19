const { PostSchema } = require("../middlewares/ValidationBody")
const Post = require('../models/post.model')
const cloudinary = require('../utils/cloudinary')
const User = require('../models/user.model')
const Inddit = require("../models/inddits.model")
const { default: mongoose } = require("mongoose")

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
            const posts = await Post.aggregate([
                {
                    $lookup: {
                        from: "inddits",            // The collection to join
                        localField: "community_id",      // Field in the post collection (foreign key)
                        foreignField: "_id",            // Field in the community collection (primary key)
                        as: "communityName"             // Output array of matched documents from community
                    }
                },
                {
                    $unwind: "$communityName"          // Unwind the array to make communityInfo a single object
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "author_id",
                        foreignField: "_id",
                        as: "authorName"
                    }
                },
                {
                    $unwind: "$authorName"
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        likes: 1,
                        image: 1,
                        community_id: 1,
                        "communityName.name": 1,
                        "authorName.username": 1
                    }
                }
            ]);

            return res.status(200).json(posts)
        } catch (error) {
            console.log(error)
        }
    }
}