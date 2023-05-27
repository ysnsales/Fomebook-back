import joi from "joi";

export const postSchema = joi.object({
    picture: joi.string().required(),
    description: joi.string().required(),
});