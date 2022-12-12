const Contact = require("../../models/contacts");

const getContactById = async (req, res) => {
    const { id: contactId } = req.params;
    const { _id: userId } = req.user;
    const result = await Contact.find({ _id: contactId, owner: userId });
    res.json(result);
};

module.exports = getContactById;
