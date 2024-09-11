const { CommunitySchema } = require("../middlewares/ValidationBody")
const Category = require("../models/categories.model")
const Inddit = require("../models/inddits.model")
const cloudinary = require("../utils/cloudinary")
const category = require("./category")

module.exports = {
    async createCommunity(req, res) {
        try {
            const data = req.body
            const { error } = CommunitySchema.create.validate(data)
            const valid = error == null
            if (!valid) {
                return res.status(422).json({
                    response_message: error.message
                })
            }
            const find = await Inddit.find({ name: data.name })
            if (find.length > 0) {
                return res.status(422).json({
                    response_message: 'Community Already Exist'
                })
            }

            const category = await Category.find({ name: data.category })
            const logo = await cloudinary.uploader.upload(data.logo, {
                folder: "Inddit"
            })
            const banner = await cloudinary.uploader.upload(data.banner, {
                folder: "Inddit"
            })

            const create = await Inddit.create({
                name: data.name,
                description: data.description,
                banner: banner.secure_url,
                logo: logo.secure_url,
                category_id: category[0]._id,
                owner_id: data.user_id
            })
            return res.status(200).json({data: create, msg: 'Community Successfully Created' })
        }
        catch (error) {
            console.log(error)
            return res.status(500).json({ msg: error.message })
        }

    },

    async getCommunities(req, res) {
        try {
            const communities = await Inddit.find({})
            return res.status(200).json(communities)
        } catch (error) {
            console.log(error)
        }
    }

}