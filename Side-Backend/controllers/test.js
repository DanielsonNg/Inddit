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
            const {id} = req.params
            const product = await Product.findById(id)
            return res.status(200).json(product)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
    
    async addProducts(req, res) {
        try {
            const product = await Product.create(req.body)
            return res.status(200).json(product)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
}