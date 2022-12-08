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

router.get("/", controllerWrapper(listContacts));

router.get("/:id", controllerWrapper(getContactById));

router.post(
    "/",
    middlewares.validateBody(schemaForAddContact),
    controllerWrapper(addContact)
);

router.delete("/:id", controllerWrapper(removeContact));

router.put(
    "/:id",
    middlewares.validateBody(schemaForUpdateContact),
    controllerWrapper(updateContact)
);

router.patch(
    "/:id/favorite",
    middlewares.validateBody(schemaForUpdateFavorite),
    controllerWrapper(updateStatusContact)
);

module.exports = router;
