const Joi = require('joi')

const create = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    banner: Joi.string().required(),
    logo: Joi.string().required(),
    user_id: Joi.string().required(),
    token: Joi.string()
})

const find = Joi.object().keys({
    id: Joi.string().required(),
})

module.exports = {
    create,
    find
}