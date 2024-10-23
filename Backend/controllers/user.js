const User = require('../models/user.model')
const cloudinary = require('../utils/cloudinary')

module.exports = {
    async changeProfilePicture(req, res) {
        try {
            const data = req.body

            const userFind = await User.findOne({ email: data.email })

            if (userFind.image_public_id) {
                await cloudinary.uploader.destroy(userFind.image_public_id)
            }

            const image = await cloudinary.uploader.upload(data.image, {
                folder: 'Inddit'
            })

            const user = await User.findOneAndUpdate({ email: data.email }, { image: image.secure_url, image_public_id: image.public_id }, { new: 1 })

            return res.status(200).json({ msg: "Profile Picture Changed Successfully", user: user })
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },
}