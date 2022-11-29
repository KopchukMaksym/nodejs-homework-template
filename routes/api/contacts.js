const express = require("express");
const { createError } = require("../../helpers/createError");
const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
} = require("../../models/contacts");
const schemaForAddContact = require("../validation/schemaForAddContact");
const schemaForUpdateContact = require("../validation/schemaForUpdateContact");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const contacts = await listContacts();
        res.json(contacts);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const contactById = await getContactById(id);
        if (contactById) {
            res.json(contactById);
        }
        throw createError({ status: 404, message: "Not found" });
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const validation = schemaForAddContact.validate(req.body);

        if (validation.error) {
            throw createError({
                status: 400,
                message: validation.error.message,
            });
        } else {
            const array = await listContacts();
            const id = array.length + 1;
            req.body.id = `${id}`;
            const newContact = await addContact(req.body);
            res.status(201).json(newContact);
        }
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const deleteContact = await removeContact(req.params.id);
        if (deleteContact) {
            res.status(200).json({ message: "contact deleted" });
        } else throw createError({ status: 404, message: "Not found" });
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const validation = schemaForUpdateContact.validate(req.body);
        const id = req.params.id;
        if (validation.error) {
            res.status(400).json({ message: validation.error.message });
        } else {
            const contact = await updateContact(id, req.body);
            if (contact) {
                res.status(200).json(contact);
            } else {
                throw createError({ status: 404, message: "Not found" });
            }
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
