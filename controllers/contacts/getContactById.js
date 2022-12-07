const createError = require("../../helpers/createError");
const Contact = require("../../models/index");

const getContactById = async (req, res) => {
    const { id } = req.params;

    const result = await Contact.findById(id);
    console.log("result", result);
    res.json(result);
};

module.exports = getContactById;
