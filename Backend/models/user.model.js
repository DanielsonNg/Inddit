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
        },
        role:{
            type: String,
            require: true
        },
        refreshToken: String
        
    },
    {
        timestamps: true
    }
    )

const User = mongoose.model("user", UserSchema)
module.exports = User