const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createError } = require("../../helpers");
const User = require("../../models/users");

const { JWT_SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const userIsExist = await User.findOne({ email });

    if (!userIsExist) {
        throw createError({ status: 401, message: "Email or password wrong" });
    }

    if (!userIsExist.verify) {
        throw createError({
            status: 401,
            message: "Please, verificate your email",
        });
    }

    const passwordCompare = await bcrypt.compare(
        password,
        userIsExist.password
    );

    if (!passwordCompare) {
        throw createError({ status: 401, message: "Email or password wrong" });
    }

    const payload = {
        id: userIsExist._id,
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY);
    await User.findByIdAndUpdate(userIsExist._id, { token });

    res.status(200).json({
        token: token,
        email: userIsExist.email,
        subscription: userIsExist.subscription,
    });
};

module.exports = loginUser;
