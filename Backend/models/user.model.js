const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        email:{
            type: String,
            require:true
        },
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
        token: String
        
    },
    {
        timestamps: true
    }
    )

const User = mongoose.model("user", UserSchema)
module.exports = User