const Joi = require("joi")

const change = Joi.object().keys({
    email: Joi.string().email().required(),
    new_password: Joi.string().required().min(8).max(12),
})

module.exports={
    change
}