const Joi = require("joi");

const create = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    image: Joi.allow(null),
    user_id: Joi.string().required(),
    community_id: Joi.string().required()
})

const edit = Joi.object().keys({
    content: Joi.string().required()
})

const getAll = Joi.object().keys({
    user_id: Joi.string().required()
})

module.exports = {
    create,
    edit,
    getAll
}