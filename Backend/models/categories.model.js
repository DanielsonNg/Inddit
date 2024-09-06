const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category can't have empty name"]
        }
    }
)

const Category = mongoose.model("Category", CategorySchema)
module.exports = Category