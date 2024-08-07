const User = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { LoginSchema, RegisterSchema } = require('../middlewares/ValidationBody')

module.exports = {
    async signup(req, res, next) {
        try {
            const { error } = RegisterSchema.register.validate(req.body)
            const valid = error == null
            if (!valid) {
                return res.status(422).json({
                    response_message: error.message
                })
            }

            const { username, email, password } = req.body
            const userN = await User.findOne({ email: email })
            const userE = await User.findOne({ username: username })
            //email & username exist
            if (userN && userE) {
                return res.status(401).json({
                    message: {
                        email: 'Email Registered',
                        username: 'User Exist'
                    }
                })
            }
            else if (userN) return res.status(401).json({ message: { email: 'Email Registered' } })
            else if (userE) return res.status(401).json({ message: { username: 'User Exist' } })

            const hashedPwd = await bcrypt.hash(password, 10)

            //store db
            const userCreate = await User.create({ email: email, username: username, password: hashedPwd, role: 'member' })
            const token = jwt.sign({ _id: userCreate.id }, process.env.SECRET_KEY, { expiresIn: '90d' })
            return res.status(200).json({
                status: 'success',
                message: 'User registered successfully',
                token,
                user: {
                    _id: userCreate._id,
                    name: userCreate.username,
                    role: userCreate.role
                }
            })
        } catch (error) {
            console.log(error)
        }
    },
    async signin(req, res, next) {
        try {
            const { error } = LoginSchema.login.validate(req.body)
            const valid = error == null
            if (!valid) {
                return res.status(422).json({
                    response_message: error.message
                })
            }

            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) return res.status(404).json({ message: { email: 'User isn\'t registered!' } })

            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return res.status(401).json({ message: { password: 'Password Incorrect' } })
            }
            const token = jwt.sign({ _id: user.id }, process.env.SECRET_KEY, { expiresIn: '90d' })

            return res.status(200).json({
                status: 'success',
                token,
                message: 'Logged in successfully',
                user: {
                    _id: user._id,
                    name: user.username,
                    role: user.role
                }

            })

        } catch (error) {
            console.log((error))
        }
    }
}