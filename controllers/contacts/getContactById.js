const Contact = require("../../models/contacts");

const getContactById = async (req, res) => {
    const { id } = req.params;

    const result = await Contact.findById(id);
    res.json(result);
};

module.exports = getContactById;
