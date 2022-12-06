const createError = require("../../helpers/createError");
const Contact = require("../../models/index");

const removeContact = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Contact.findByIdAndRemove(id);
        res.status(204).send();
    } catch (error) {
        throw createError({ status: 404, message: "Not Found" });
    }
};

module.exports = removeContact;
