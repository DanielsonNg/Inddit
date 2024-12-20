const Joi = require("joi");
const category = require("../../../controllers/category");

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
    user_id: Joi.string().required(),
    category: Joi.string().allow(null)
})

const getAllGuest = Joi.object().keys({
    category: Joi.string().allow(null)
})

const getAllSaved = Joi.object().keys({
    user_id: Joi.string().required()
})

module.exports = {
    create,
    edit,
    getAll,
    getAllSaved,
    getAllGuest
}