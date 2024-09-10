const Inddit = require("../models/inddits.model")
const cloudinary = require("../utils/cloudinary")

module.exports = {
    async createCommunity(req, res) {
        // console.log(req.body)
        const logo = await cloudinary.uploader.upload(req.body.logo,{
            folder:"Inddit"
        })
        const banner = await cloudinary.uploader.upload(req.body.banner,{
            folder:"Inddit"
        })

        console.log(banner.secure_url)
        console.log(logo.secure_url)
        // const create = await Inddit.create({
        //     req
        // })
        // console.log(req.file)
        // console.log(req.file)
        // const create = await Inddit.create(req.body)

        return res.status(200).json({msg:'Successfully created'})
    },

    async getCommunity(res){
        
    }

}