const User = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    async signup(req, res, next) {
        try {
            const password = req.body.password
            const user = await User.findOne({ username: req.body.username })
            if (user) return res.status(401).json({ message: 'User Exist' })
            const hashedPwd = await bcrypt.hash(password, 10)

            //store db
            const userCreate = await User.create({ username: req.body.username, password: hashedPwd, role: 'member' })
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
            const { username, password } = req.body
            const user = await User.findOne({ username })
            if (!user) return res.status(404).json({ message: 'User isn\'t registered!' })

            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Username or Password Incorrect' })
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