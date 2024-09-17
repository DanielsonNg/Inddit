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
            required: [true, "Image is required"]
        },
        likes: {
            type: Number,
        }
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model("Post", PostSchema);
module.exports = Post