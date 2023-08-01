import Joi from "joi";

export const usersSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required()
});