const Joi = require("joi");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const schemaForUsers = Joi.object({
    email: Joi.string().pattern(emailRegexp).required("Email is required"),
    password: Joi.string().min(8).required(),
});

module.exports = schemaForUsers;
