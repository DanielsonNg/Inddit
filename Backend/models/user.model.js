const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        username: {
            type:String,
            require: true
        },
        password: {
            type:String,
            require: true
        }
    },
    {
        timestamps: true
    }
    )

const User = mongoose.model("user", UserSchema)
module.exports = User