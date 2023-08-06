import Joi from "joi";

export const signinSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().required()
})