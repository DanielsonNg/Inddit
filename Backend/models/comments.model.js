const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId

const CommentSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Content is required"]
        },
        parent_id: {
            type: ObjectId,
        },
        user_id: {
            type: ObjectId,
            required: [true , "User is required"]
        }
    },
    { timestamps: true}
)

const Comment = mongoose.model("Comment", CommentSchema)
module.exports = Comment