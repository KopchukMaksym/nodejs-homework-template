const Contact = require("../../models/contacts");

const removeContact = async (req, res) => {
    const { id: contactId } = req.params;
    const { _id: userId } = req.user;

    const result = await Contact.findOneAndRemove({
        _id: contactId,
        owner: userId,
    });
    res.status(204).send();
};

module.exports = removeContact;
