const Category = require("../models/categories.model")

module.exports = {
    async insertCategory(req, res) {
        try {
            const category = await Category.create(req.body)
            return res.status(200).json(category)
        } catch (error) {
            console.log(error)
            return res.status(500)
        }

    },
    async getCategories(req, res) {
        try {
            const categories = await Category.find({}, { _id: 0, name: 1 })
            return res.status(200).json(categories)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error.message })
        }
    }
}