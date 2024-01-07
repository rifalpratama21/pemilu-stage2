import * as Joi from 'joi'

export const CrPaslonSchema = Joi.object({
    name: Joi.string().min(5).max(70).required(),
    visi_misi: Joi.string().min(5).required()
})