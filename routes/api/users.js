const express = require("express");
const {
    loginUser,
    registerUser,
    getCurrentUser,
    logoutUser,
    updateAvatar,
    verify,
    verifyUser,
} = require("../../controllers/users");
const { controllerWrapper } = require("../../helpers");
const router = express.Router();

const middlewares = require("../../middlewares");
const { schemaForUsers, schemaForUsersVerify } = require("../../schemas/users");

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
router.post(
    "/verify",
    middlewares.validateBody(schemaForUsersVerify),
    controllerWrapper(verifyUser)
);

router.get("/logout", middlewares.authenticate, controllerWrapper(logoutUser));

router.get(
    "/current",
    middlewares.authenticate,
    controllerWrapper(getCurrentUser)
);

router.patch(
    "/avatars",
    middlewares.authenticate,
    middlewares.upload.single("avatar"),
    controllerWrapper(updateAvatar)
);
router.get("/verify/:verificationToken", controllerWrapper(verify));

module.exports = router;
