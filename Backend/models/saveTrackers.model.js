const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId

const SaveTrackerSchema = mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            required: [true, 'User Id is required']
        },
        post_id: {
            type: ObjectId,
            required: [true, 'Post Id is required']
        }
    }
)

const SaveTracker = mongoose.model("SaveTracker", SaveTrackerSchema)
module.exports = SaveTracker