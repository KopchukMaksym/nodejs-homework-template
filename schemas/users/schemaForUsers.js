const Joi = require("joi");

const schemaForUsers = Joi.object({
    email: Joi.string().email().required("Email is required"),
    password: Joi.string().min(8).required(),
});
module.exports = schemaForUsers;
