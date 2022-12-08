const Contact = require("../../models/contacts");

const removeContact = async (req, res) => {
    const { id } = req.params;

    const result = await Contact.findByIdAndRemove(id);
    res.status(204).send();
};

module.exports = removeContact;
