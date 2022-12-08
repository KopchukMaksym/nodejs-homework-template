const express = require("express");
const { loginUser, registerUser } = require("../../controllers/users");
const { controllerWrapper } = require("../../helpers");
const router = express.Router();

const middlewares = require("../../middlewares");
const { schemaForUsers } = require("../../schemas/users");

router.post(
    "/register",
    middlewares.validateBody(schemaForUsers),
    controllerWrapper(registerUser)
);
router.get(
    "/login",
    middlewares.validateBody(schemaForUsers),
    controllerWrapper(loginUser)
);

module.exports = router;
