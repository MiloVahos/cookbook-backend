import * as Joi from 'joi';

export const createRecipeSchema: Joi.ObjectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});
