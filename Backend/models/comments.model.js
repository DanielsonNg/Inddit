const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const CommentSchema = mongoose.Schema(
    {
        content:{
            type: String,
            required: [true, "Content is required"]
        },
        comment_id:{
            type: ObjectId,
        }
    }   
)

const Comment = mongoose.model("Comment", CommentSchema)
module.exports = Comment