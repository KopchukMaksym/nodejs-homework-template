const createError = require("../../helpers/createError");
const Contact = require("../../models/index");

async function updateStatusContact(req, res) {
    if (Object.keys(req.body).length === 0) {
        throw createError({
            status: 400,
            message: "missing field favorite",
        });
    }
    const { id } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
        id,
        {
            favorite,
        },
        { new: true }
    );
    res.status(200).json(result);
}

module.exports = updateStatusContact;
