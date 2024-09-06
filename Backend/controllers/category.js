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
}