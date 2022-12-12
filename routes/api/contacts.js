const express = require("express");
const router = express.Router();

const {
    getContactById,
    listContacts,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
} = require("../../controllers/contacts");

const {
    schemaForAddContact,
    schemaForUpdateContact,
    schemaForUpdateFavorite,
} = require("../../schemas/contacts");

const { controllerWrapper } = require("../../helpers");
const middlewares = require("../../middlewares");

router.get("/", middlewares.authenticate, controllerWrapper(listContacts));

router.get("/:id", middlewares.authenticate, controllerWrapper(getContactById));

router.post(
    "/",
    middlewares.authenticate,
    middlewares.validateBody(schemaForAddContact),
    controllerWrapper(addContact)
);

router.delete(
    "/:id",
    middlewares.authenticate,
    controllerWrapper(removeContact)
);

router.put(
    "/:id",
    middlewares.authenticate,
    middlewares.validateBody(schemaForUpdateContact),
    controllerWrapper(updateContact)
);

router.patch(
    "/:id/favorite",
    middlewares.authenticate,
    middlewares.validateBody(schemaForUpdateFavorite),
    controllerWrapper(updateStatusContact)
);

module.exports = router;
