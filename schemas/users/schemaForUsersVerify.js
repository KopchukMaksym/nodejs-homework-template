const Joi = require("joi");

const schemaForUsersVerify = Joi.object({
    email: Joi.string().email().required("Email is required"),
});

module.exports = schemaForUsersVerify;
