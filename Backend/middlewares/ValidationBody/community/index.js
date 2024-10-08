const Joi = require('joi')

const create = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    banner: Joi.string().required(),
    logo: Joi.string().required(),
    user_id: Joi.string().required(),
    join_approval: Joi.boolean().required(),
    post_approval: Joi.boolean().required(),
    token: Joi.string(),
})

const find = Joi.object().keys({
    id: Joi.string().required(),
})

const join = Joi.object().keys({
    user_id: Joi.string().required()
})

const leave = Joi.object().keys({
    user_id: Joi.string().required()
})

const permission = Joi.object().keys({
    user_id: Joi.string().required(),
    community_id: Joi.string().required()
})

module.exports = {
    create,
    find,
    join,
    leave,
    permission,
}