const createError = require("../../helpers/createError");
const Contact = require("../../models/index");

const listContacts = async (req, res) => {
    try {
        const result = await Contact.find({});
        res.json(result);
    } catch (error) {
        throw createError({ status: 404, message: "Not found" });
    }
};

module.exports = listContacts;
