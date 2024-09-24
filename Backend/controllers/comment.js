const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("../middlewares/ValidationBody")
const Comment = require("../models/comments.model")
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
            const create = await Comment.create({ content: data.content, parent_id: id, user_id: data.userId })
            return res.status(200).json(create)

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
                    $project: {
                        _id: 1,
                        content: 1,
                        createdAt: 1,
                        'user.username': 1,
                    }
                }
            ])
            return res.status(200).json(comments)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}