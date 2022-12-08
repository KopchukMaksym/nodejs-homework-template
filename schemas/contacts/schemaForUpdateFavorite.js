const Joi = require("joi");

const schemaForUpdateFavorite = Joi.object({
    favorite: Joi.boolean(),
});

module.exports = schemaForUpdateFavorite;
