import mongoose from "mongoose";

const ObjectId = mongoose.Schema.ObjectId

const likeTrackerSchema = mongoose.Schema(
    {
        post_id: {
            type: ObjectId,
            required: [true, 'Post Id is required']
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

const LikeTracker = mongoose.model("LikeTracker", likeTrackerSchema)
module.exports = LikeTracker