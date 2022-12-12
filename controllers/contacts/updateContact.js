const Contact = require("../../models/contacts");

const updateContact = async (req, res) => {
    const { id: contactId } = req.params;
    const { _id: userId } = req.user;
    const { name, email, phone, favorite } = req.body;

    const result = await Contact.findOneAndUpdate(
        { _id: contactId, owner: userId },
        {
            name,
            email,
            phone,
        },
        { new: true }
    );

    res.status(201).json(result);
};

module.exports = updateContact;
