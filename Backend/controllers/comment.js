const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("../middlewares/ValidationBody")
const Comment = require("../models/comments.model");
const User = require("../models/user.model");
const { deleteCommentAndChildren } = require("../utils");
const Post = require("../models/post.model");
const Inddit = require("../models/inddits.model");
const CommentLikeTracker = require("../models/commentLikeTrackers.model");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    async createComment(req, res) {
        try {
            const id = req.params.id
            const data = req.body
            const { error } = CommentSchema.create.validate(data)
            const valid = error == null
            if (!valid) {
                return res.status(422).json({
                    response_message: error.message
                })
            }
            const parent = await Comment.findById(id)
            if (parent !== null) {
                await Comment.findByIdAndUpdate(id, { is_replied: 1 })
            }
            const create = await Comment.create({ content: data.content, parent_id: id, user_id: data.userId })
            const user = await User.findById(data.userId)
            const updatePost = await Post.findByIdAndUpdate(data.postId, { $inc: { comments: 1 } })
            const params = {
                content: create.content,
                likes: create.likes,
                is_replied: create.is_replied,
                _id: create._id,
                parent_id: create.parent_id,
                user: {
                    username: user.username,
                    _id: user._id
                },
                createdAt: create.createdAt
            }
            return res.status(200).json(params)

        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async getComments(req, res) {
        try {
            const id = req.params.id
            const comments = await Comment.aggregate([
                {
                    $match: {
                        parent_id: ObjectId.createFromHexString(id)
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $lookup: {
                        from: 'commentliketrackers',
                        localField: '_id',
                        foreignField: 'comment_id',
                        as: 'liked',
                    }
                },
                {
                    $addFields: {
                        tracker: {
                            $filter: {
                                input: "$liked",       
                                as: "lk",                
                                cond: {
                                    $eq: ["$$lk.user_id", ObjectId.createFromHexString(req.body.user_id)] 
                                }
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        content: 1,
                        createdAt: 1,
                        'user.username': 1,
                        likes: 1,
                        is_replied: 1,
                        'user._id': 1,
                        'liked': 1,
                    }
                }
            ])
            return res.status(200).json(comments)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async editComment(req, res) {
        try {
            const commentId = req.params.id
            const { error } = CommentSchema.edit.validate(req.body)
            const valid = error == null
            if (!valid) {
                return res.status(422).json({
                    response_message: error.message
                })
            }
            const edit = await Comment.findByIdAndUpdate(commentId, { content: req.body.newContent }, { new: true })
            return res.status(200).json(edit)
        } catch (error) {
            console.log(error)
            return res.status(500)
        }
    },

    async deleteComment(req, res) {
        try {
            const commentId = req.params.id
            const comment = await Comment.findById(commentId)
            const sibling = await Comment.find({ parent_id: comment.parent_id })
            let is_replied = 1
            if (sibling.length === 1) {
                //set is replied to empty if no sibling found
                is_replied = 0
                await Comment.findByIdAndUpdate(comment.parent_id, { is_replied: 0 })
            }

            let count = 0
            count = await deleteCommentAndChildren(commentId, count);
            const del = await Comment.findByIdAndDelete(commentId)
            //update comment counts
            const updatePost = await Post.findByIdAndUpdate(comment.parent_id, { $inc: { comments: -Math.abs(count) } })


            return res.status(200).json({ msg: "Comment Deleted", is_replied: is_replied })
        } catch (error) {
            console.log(error)
            return res.status(500)
        }

    },

    async likeComment(req, res) {
        try {
            const id = req.params.id
            const comment = await Comment.findByIdAndUpdate(id, { $inc: { likes: 1 } })
            const like = await CommentLikeTracker.create({ comment_id: id, user_id: req.body.user_id })
            return res.status(200).json(like)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async unlikeComment(req, res) {
        try {
            const id = req.params.id

            const comment = await Comment.findByIdAndUpdate(id, { $inc: { likes: -1 } })
            const findLike = await CommentLikeTracker.findOne({ comment_id: id, user_id: req.body.user_id })
            const unlike = await CommentLikeTracker.findByIdAndDelete(findLike._id)
            return res.status(200).json(unlike)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },
}