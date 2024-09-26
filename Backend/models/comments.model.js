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
            ref: 'Comment',
            onDelete:'cascade'
        },
        user_id: {
            type: ObjectId,
            required: [true , "User is required"]
        },
        likes: {
            type: Number,
            default: 0
        },
        is_replied:{
            type: Number,
            default: 0
        }
    },
    { timestamps: true}
)

CommentSchema.pre("deleteMany", async function(next){
    try {
        const replies = await Comment.find({parent_id: this._id})
        for(reply of replies){
            await Comment.remove()
        }
        next(replies)
    } catch (error) {
        next(error)
    }
})

const Comment = mongoose.model("Comment", CommentSchema)
module.exports = Comment