const { createError, sendEmail } = require("../../helpers");
const User = require("../../models/users");
const { BASE_URL } = process.env;

const verifyUser = async (req, res) => {
    const { email } = req.body;

    const userIsExist = await User.findOne({ email });

    if (!userIsExist) {
        throw createError({ status: 401, message: "User is not found" });
    }

    if (userIsExist.verify) {
        throw createError({
            status: 400,
            message: "Verification has already been passed",
        });
    }

    const verificationTokenUrl = `${BASE_URL}/api/users/verify/${userIsExist.verificationToken}`;
    const message = {
        to: email,
        subject: "Email verification",
        html: `<a href="${verificationTokenUrl}">Click to verify your email</a>`,
    };
    await sendEmail(message);

    res.status(200).json({
        message: "Verification email sent",
    });
};

module.exports = verifyUser;
