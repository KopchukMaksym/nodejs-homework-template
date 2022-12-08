const bcrypt = require("bcrypt");
const { createError } = require("../../helpers");
const User = require("../../models/users");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const userIsExist = await User.findOne({ email });

    if (!userIsExist) {
        throw createError({ status: 401, message: "Email or password wrong" });
    }

    const passwordCompare = await bcrypt.compare(
        password,
        userIsExist.password
    );

    if (!passwordCompare) {
        throw createError({ status: 401, message: "Email or password wrong" });
    }

    const token = "kansdlkjfnakdslnfkjadsnfk";

    res.json({ token });
};

module.exports = loginUser;
