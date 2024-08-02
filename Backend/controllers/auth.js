require('dotenv').config()
const jwt = require('jsonwebtoken')
const { generateAccessToken } = require('../middlewares/validationHeader')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const Role = require('../models/roles.model')

let refreshTokens = []
module.exports = {

    async login(req, res) {
        const username = req.body.username
        const password = req.body.password
        const user = {
            name: username
        }
        if (!username || !password) return res.status(400).json({ 'message': "Username and Password is required" })
        const userFind = await User.findOne({ username: username }).exec()
        if (!userFind) {
            return res.sendStatus(401)
        }
        const match = await bcrypt.compare(password, userFind.password)
        if (match) {
            const accessToken = await generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
            refreshTokens.push(refreshToken)
            userFind.refreshToken = refreshToken
            //
            let role = userFind.role
            const result = await userFind.save()
            
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
            res.json({role, accessToken })
        } else {
            return res.sendStatus(401)
        }
    },

    async token(req, res) {
        const refreshToken = req.body.token
        if (refreshTokens === null) {
            return res.sendStatus(401)
        }

        if (!refreshTokens.includes(refreshToken)) {
            return res.sendStatus(403)
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            const accessToken = await generateAccessToken({ name: user.name })
            // console.log(accessToken)
            return res.json({ accessToken: accessToken })
        })
    },

    async logout(req, res) {
        // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
        // res.sendStatus(204)
        const cookies = req.cookies
        if (!cookies?.jwt) return res.sendStatus(204)

        const refreshToken = cookies.jwt
        const userFind = await User.findOne({ refreshToken })
        if (!userFind) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
            return res.sendStatus(204)
        }
        userFind.refreshToken = ''
        const result = await userFind.save()
        console.log(result)

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204)
    },

    async register(req, res) {
        const user = req.body.username
        const password = req.body.password
        console.log(req.body)
        console.log(user, password)
        console.log('yes')
        if (!user || !password) return res.status(400).json({ 'message': "Username and Password is required" })
        const duplicate = await User.find({ username: user })
        if (duplicate.length !== 0) {
            return res.status(409).json("Username already exist")
        }
        try {
            //encrypt
            const hashedPwd = await bcrypt.hash(password, 10)
            //store db
            const userCreate = await User.create({ username: user, password: hashedPwd, role: '66ab0b1e05bf04cc27a31ccb' })
            return res.status(200).json(userCreate)

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    async handleRefreshToken(req, res) {
        const cookies = req.cookies
        if (!cookies?.jwt) return res.sendStatus(401)
        const refreshToken = cookies.jwt
        const userFind = await User.findOne({ refreshToken: refreshToken }).exec()
        if (!userFind) {
            return res.sendStatus(403)
        }
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, user) => {
                if (err || userFind.username !== user.name) {
                    console.log(user)
                    return res.sendStatus(403)
                }
                const accessToken = jwt.sign(
                    { "username": user.username }
                    , process.env.ACCESS_TOKEN_SECRET
                    , { expiresIn: '30m' }
                )
                res.json({userFind, accessToken })
            }
        )
    },

    async addRole(req,res){
        const result = await Role.create({name:req.body.name})
        const role = await Role.find({})
        // console.log(role[0]._id.toString())
        return res.sendStatus(200)
    }
}
