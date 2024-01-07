import * as Joi from 'joi'

export const CrArticleSchema = Joi.object({
    title: Joi.string().min(5).max(70).required(),
    author: Joi.string().min(5).required(),
    description: Joi.string().min(5).required(),
    users: Joi.number().required()
})