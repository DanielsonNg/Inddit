const Joi = require('joi')

const register = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(12),
    username: Joi.string().required().min(3).max(12)
})


module.exports = {
    register
}