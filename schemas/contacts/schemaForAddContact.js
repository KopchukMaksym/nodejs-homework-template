const Joi = require("joi");

const schemaForAddContact = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
        .required(),
    phone: Joi.string()
        .regex(/^[0-9]{10}$/)
        .messages({
            "string.pattern.base": `Phone number must have 10 digits.`,
        })
        .required(),
    favorite: Joi.boolean(),
});

module.exports = schemaForAddContact;
