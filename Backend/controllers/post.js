const { PostSchema } = require("../middlewares/ValidationBody")
const Post = require('../models/post.model')
const cloudinary = require ('../utils/cloudinary')

module.exports = {
    async createPost(req, res) {
        try {
            const data = req.body
            const {error} = PostSchema.create.validate(data)
            const valid = error == null
            if(!valid){
                return res.status(422).json({
                    response_message: error.message
                })
            }

            const image = await cloudinary.uploader.upload(data.image, {
                folder:'Inddit'
            })

            const create = await Post.create({
                title: data.title,
                description: data.description,
                image: image.secure_url,
            })

            return res.status(200).json(create)

        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    async getPosts(req, res) {
        try {

        } catch (error) {
            console.log(error)
        }
    }
}