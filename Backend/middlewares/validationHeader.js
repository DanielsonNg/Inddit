require('dotenv').config()
const jwt = require('jsonwebtoken')
const role = require('../models/roles.model')
const user = require('../models/user.model')
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    async validateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) {
            return res.sendStatus(401)
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user
            next()
        })

    },

    async generateAccessToken(user) {
        // console.log(user)
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
    },

    async adminOnly(req, res, next) {
        let newObjectId = new ObjectId(req.body.userId)
        // Search User
        const findId = await user.findOne(newObjectId)
        // Get Role By id with User Role Id
        newObjectId = new ObjectId(findId.role)
        const findRoleId = await role.findOne(newObjectId)
        if (findRoleId.name !== "admin") {
            return res.sendStatus(401)
        }
        next()
    },
    async memberOnly(req, res, next) {
        let newObjectId = new ObjectId(req.body.userId)
        // Search User
        const findId = await user.findOne(newObjectId)
        // Get Role By id with User Role Id
        newObjectId = new ObjectId(findId.role)
        const findRoleId = await role.findOne(newObjectId)
        if (findRoleId.name !== "member") {
            return res.sendStatus(401)
        }
        next()
    },

    // async authRole(role) {
    //     return async (req, res, next) => {
    //         const user = await user.findOne({ id: req.id })
    //         if (!req.user.role === role) {
    //             return res.sendStatus(401)
    //         }
    //     }
    // }
}