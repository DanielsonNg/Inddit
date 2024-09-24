const Joi = require("joi")

const create = Joi.object().keys({
    content: Joi.string().required(),
    userId: Joi.string().required()
})

module.exports = {
    create
}