const createError = require("../../helpers/createError");
const Contact = require("../../models/index");

const listContacts = async (req, res) => {
    const result = await Contact.find({});
    res.json(result);
};

module.exports = listContacts;
