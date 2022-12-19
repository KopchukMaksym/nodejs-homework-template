const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { createError } = require("../../helpers");
const User = require("../../models/users");

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const userIsExist = await User.findOne({ email }).exec();

    if (userIsExist) {
        throw createError({
            status: 409,
            message: "Email in use",
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email, { protocol: "https" });

    const result = await User.create({
        email,
        password: hashPassword,
        avatarURL,
    });

    res.status(201).json({
        email: result.email,
        subscription: result.subscription,
    });
};

module.exports = registerUser;
