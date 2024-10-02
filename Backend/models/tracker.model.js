const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId

const TrackerSchema = mongoose.Schema(
    {
        community_id: {
            type: ObjectId,
            required: [true, 'Community Id is required']
        },
        user_id: {
            type: ObjectId,
            required: [true, 'User Id is required']
        },
        //permission code
        //0 Request Join
        //1 Member
        //2 Admin
        //3 Owner
        permission: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const Tracker = mongoose.model("Tracker", TrackerSchema)
module.exports = Tracker