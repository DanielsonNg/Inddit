const { CommentSchema } = require("../middlewares/ValidationBody")
const Comment = require("../models/comments.model")

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
            const create = await Comment.create({ content: data.content, parent_id: id})
            return res.status(200).json(create)

        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async getComments(req,res){
        try {
            const id = req.params.id
            const comments = await Comment.find({parent_id: id})

            return res.status(200).json(comments)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}