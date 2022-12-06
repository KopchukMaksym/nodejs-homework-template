const createError = require("../../helpers/createError");
const Contact = require("../../models/index");

const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, favorite } = req.body;

        const result = await Contact.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            favorite,
        });

        res.status(201).json(result);
    } catch (error) {
        throw createError({ status: 404, message: "Not Found" });
    }
};

module.exports = updateContact;
