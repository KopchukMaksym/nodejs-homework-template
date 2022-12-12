const User = require("../../models/users");

const logoutUser = async (req, res) => {
    const { _id } = req.user;

    await User.updateOne({ _id }, { token: "" });

    res.status(204).json({
        message: "Logout success",
    });
};

module.exports = logoutUser;
