const Joi = require("joi");

const create = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required()
})

module.exports ={
    create
}