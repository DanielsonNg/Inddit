const Joi = require('joi')

const create = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    banner: Joi.string().required(),
    logo: Joi.string().required()
})

module.exports = {
    create
}