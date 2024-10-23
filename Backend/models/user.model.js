const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: true
        },
        username: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        role: {
            type: String,
            require: true
        },
        image: {
            type: String,
            default: 'https://res.cloudinary.com/dtrgatxpp/image/upload/v1726543992/ProfileDefault.png'
        },
        image_public_id: {
            type: String,
            default: null
        },
        token: String

    },
    {
        timestamps: true
    }
)

const User = mongoose.model("user", UserSchema)
module.exports = User