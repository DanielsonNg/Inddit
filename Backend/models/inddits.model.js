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
        }
    },
    {
        timestamps: true
    }
)

const Inddit = mongoose.model("Inddit", IndditSchema)
module.exports = Inddit