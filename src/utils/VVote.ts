import * as Joi from 'joi';

export const CrVoteSchema = Joi.object({
    usersId: Joi.number().required(),
    paslonId: Joi.number().required()
})