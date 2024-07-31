require('dotenv').config()
const jwt = require('jsonwebtoken')
const { generateAccessToken } = require('../middlewares/validationHeader')


let refreshTokens = []
module.exports = {

    async login(req, res) {
        const username = req.body.username
        const user = {
            name: username
        }
        const accessToken = await generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)
        // console.log(accessToken)
        // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.json({ accessToken: accessToken, refreshToken: refreshToken })
    },

    async token(req, res) {
        const refreshToken = req.body.token
        if(refreshTokens === null){
            return res.sendStatus(401)
        }

        if(!refreshTokens.includes(refreshToken)){
            return res.sendStatus(403)
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,async (err, user)=>{
            if(err){
                return res.sendStatus(403)
            }
            const accessToken = await generateAccessToken({name : user.name})
            // console.log(accessToken)
            return res.json({accessToken: accessToken})
        })
    },

    async logout(req,res){
        refreshTokens = refreshTokens.filter(token=> token !== req.body.token)
        res.sendStatus(204)
    },

    async register(req,res){
        console.log('yes')
    }
}