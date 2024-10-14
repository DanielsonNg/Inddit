const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId
// const Integer = mongoose.Schema.Int32

const PostSchema = mongoose.Schema(
    {
        community_id: {
            type: ObjectId,
            required: [true, 'Community_id is required']
        },
        author_id: {
            type: ObjectId,
            required: [true, 'User_id is required']
        },
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        image: {
            type: String,
        },
        image_public_id: {
            type: String,
        },
        likes: {
            type: Number,
            default: 0
        },
        status: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model("Post", PostSchema);
module.exports = Post