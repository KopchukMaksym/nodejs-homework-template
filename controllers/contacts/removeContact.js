const createError = require("../../helpers/createError");
const Contact = require("../../models/index");

const removeContact = async (req, res) => {
    const { id } = req.params;

    const result = await Contact.findByIdAndRemove(id);
    res.status(204).send();
};

module.exports = removeContact;
