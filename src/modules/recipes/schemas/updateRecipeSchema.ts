import * as Joi from 'joi';

export const updateRecipeSchema: Joi.ObjectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});
