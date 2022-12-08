const Contact = require("../../models/contacts");

const updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;

    const result = await Contact.findByIdAndUpdate(id, {
        name,
        email,
        phone,
        favorite,
    });

    res.status(201).json(result);
};

module.exports = updateContact;
