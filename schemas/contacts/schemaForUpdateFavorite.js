const Joi = require("joi");

const schemaForUpdateFavorite = Joi.object({
    favorite: Joi.boolean()
        .required()
        .error(new Error("missing field favorite")),
});

module.exports = schemaForUpdateFavorite;
