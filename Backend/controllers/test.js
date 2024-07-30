const Product = require('../models/products.model')

module.exports = {
    async testNode(req, res) {
        console.log('its working!')
        return "test"
    },

    async getPosts(req, res) {
        const posts = [
            {
                username: 'Daniel',
                title: 'Res'
            },
            {
                username: 'Danielsiuu',
                title: 'Reseet'
            },
        ]
        return res.json(posts.filter(post => post.username === req.user.name))
    },
    async getProducts(req, res) {
        try {
            const product = await Product.find({})
            return res.status(200).json(product)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
    async getProduct(req, res) {
        try {
            const { id } = req.params
            const product = await Product.findById(id)
            return res.status(200).json(product)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    async addProduct(req, res) {
        try {
            const product = await Product.create(req.body)
            return res.status(200).json(product)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    async updateProduct(req, res) {
        try {
            const { id } = req.params
            const product = await Product.findByIdAndUpdate(id, req.body)
            if (!product) {
                return res.status(404).json({ message: "Product not Found" })
            }

            const updatedProduct = await Product.findById(id)

            return res.status(200).json(updatedProduct)

        } catch (error) {
            return res.status(500).json({ message: err.message })
        }
    },

    async deleteProduct(req, res) {
        try {
            const { id } = req.params
            const product = await Product.findByIdAndDelete(id)

            if (!product) {
                return res.status(404).json({ message: "Product not Found" })
            }

            return res.status(200).json({ message: "Product Deleted Successfully" })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}