require('dotenv').config()
const jwt = require('jsonwebtoken')
const { generateAccessToken } = require('../middlewares/validationHeader')
const User = require('../models/user.model')
const fs = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

let refreshTokens = []
module.exports = {

    async login(req, res) {
        const username = req.body.username
        const password = req.body.password
        const user = {
            name: username
        }
        if (!username || !password) return res.status(400).json({ 'message': "Username and Password is required" })
        const userFind = await User.find({ username: username })
        if (userFind.length === 0) {
            return res.sendStatus(401)
        }
        const match = await bcrypt.compare(password, userFind[0].password)
        if (match) {
            res.json({ 'success': `User ${username} logged in` })
        } else {
            return res.sendStatus(401)
        }

        // const accessToken = await generateAccessToken(user)
        // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        // refreshTokens.push(refreshToken)
        // // console.log(accessToken)
        // // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        // res.json({ accessToken: accessToken, refreshToken: refreshToken })
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
        refreshTokens = refreshTokens.filter(token => token !== req.body.token)
        res.sendStatus(204)
    },

    async register(req, res) {
        const { user, password } = req.body
        if (!user || !password) return res.status(400).json({ 'message': "Username and Password is required" })
        const duplicate = await User.find({ username: user })
        if (duplicate.length !== 0) {
            return res.status(409).json("Username already exist")
        }
        try {
            //encrypt
            const hashedPwd = await bcrypt.hash(password, 10)
            //store db
            const userCreate = await User.create({ username: user, password: hashedPwd })
            return res.status(200).json(userCreate)

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}