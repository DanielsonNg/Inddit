const Joi = require("joi")

const create = Joi.object().keys({
    content: Joi.string().required(),
    userId: Joi.string().required()
})

const edit = Joi.object().keys({
    userId: Joi.string().required(),
    newContent: Joi.string().required(),
})

module.exports = {
    create,
    edit,
}