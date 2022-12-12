const jwt = require("jsonwebtoken");
const { createError } = require("../helpers");
const { JWT_SECRET_KEY } = process.env;
const User = require("../models/users");

async function authenticate(req, res, next) {
    try {
        const { authorization } = req.headers;

        const [bearer, token] = authorization.split(" ");

        if (bearer !== "Bearer") {
            throw createError({ status: 401, message: "Not authorized" });
        }

        const { id } = jwt.verify(token, JWT_SECRET_KEY);

        const user = await User.findById(id);

        if (!user || !user.token || user.token !== token) {
            throw createError({ status: 401, message: "Not authorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        if (!error.status) {
            error.status = 401;
            error.message = "Not authorized";
        }

        next(error);
    }
}
module.exports = authenticate;
