const createError = require("../../helpers/createError");
const Contact = require("../../models/index");

const getContactById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Contact.findById(id);
        console.log("result", result);
        res.json(result);
    } catch (error) {
        throw createError({ status: 404, message: "Not found" });
    }
};

module.exports = getContactById;
