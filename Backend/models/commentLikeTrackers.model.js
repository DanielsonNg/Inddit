const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId

const commentLikeTrackerSchema = mongoose.Schema(
    {
        comment_id: {
            type: ObjectId,
            required: [true, 'Comment Id is required']
        },
        user_id: {
            type: ObjectId,
            required: [true, 'User Id is required']
        }
    },
    {
        timestamps : true
    }
)

const CommentLikeTracker = mongoose.model("CommentLikeTracker", commentLikeTrackerSchema)
module.exports = CommentLikeTracker