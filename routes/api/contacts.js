const express = require("express");
const {
    getContactById,
    listContacts,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
} = require("../../controllers/contacts");

const controllerWrapper = require("../../helpers/controllerWrapper");

const schemaForAddContact = require("../validation/schemaForAddContact");
const schemaForUpdateContact = require("../validation/schemaForUpdateContact");
const schemaForUpdateFavorite = require("../validation/schemaForUpdateFavorite");

const middlewares = require("../../middlewares");
const router = express.Router();

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
