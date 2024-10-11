const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId

const IndditSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Inddit name is required"]
        },
        category_id: {
            type: ObjectId,
            required: [true, "Category id is required"]
        },
        owner_id:{
            type: ObjectId,
            required: [true, "Owner is required"]
        },
        description:{
            type: String,
            required: [true, "Description is required"]
        },
        logo:{
            type: String,
            required: [true, "Logo is required"]
        },
        banner:{
            type: String,
            required: [true, "Banner is required"]
        },
        join_approval:{
            type: Number,
            required: [true, "Join Approval is required"]
        },
        post_approval:{
            type: Number,
            required: [true, "Post Approval is required"]
        },
        logo_public_id: {
            type: String, 
            required: [true, "Logo public id is required"]
        },
        banner_public_id: {
            type: String, 
            required: [true, "Banner public id is required"]
        },
    },
    {
        timestamps: true
    }
)

const Inddit = mongoose.model("Inddit", IndditSchema)
module.exports = Inddit