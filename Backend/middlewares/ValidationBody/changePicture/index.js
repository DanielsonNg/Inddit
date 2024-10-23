const Joi = require("joi")

const change = Joi.object().keys({
    email: Joi.string().email().required(),
    image: Joi.string().required()
})

module.exports={
    change
}