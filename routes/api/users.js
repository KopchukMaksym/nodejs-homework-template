const express = require("express");
const {
    loginUser,
    registerUser,
    getCurrentUser,
    logoutUser,
} = require("../../controllers/users");
const { controllerWrapper } = require("../../helpers");
const router = express.Router();

const middlewares = require("../../middlewares");
const { schemaForUsers } = require("../../schemas/users");

router.post(
    "/register",
    middlewares.validateBody(schemaForUsers),
    controllerWrapper(registerUser)
);
router.post(
    "/login",
    middlewares.validateBody(schemaForUsers),
    controllerWrapper(loginUser)
);

router.get("/logout", middlewares.authenticate, controllerWrapper(logoutUser));

router.get(
    "/current",
    middlewares.authenticate,
    controllerWrapper(getCurrentUser)
);

module.exports = router;
