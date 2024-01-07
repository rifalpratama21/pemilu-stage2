import * as Joi from 'joi'

export const CrPartaiSchema = Joi.object({
    name: Joi.string().min(5).max(70).required(),
    leader: Joi.string().min(5).required(),
    visi_misi: Joi.string().min(5).required(),
    address: Joi.string().min(5).required(),
    paslonId: Joi.number().required()
})