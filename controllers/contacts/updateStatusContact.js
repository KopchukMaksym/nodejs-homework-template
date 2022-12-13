const { createError } = require("../../helpers");
const Contact = require("../../models/contacts");

async function updateStatusContact(req, res) {
    const { id: contactId } = req.params;
    const { _id: userId } = req.user;
    const { favorite } = req.body;
    const result = await Contact.findOneAndUpdate(
        { _id: contactId, owner: userId },
        {
            favorite,
        },
        { new: true }
    );
    res.status(200).json(result);
}

module.exports = updateStatusContact;
