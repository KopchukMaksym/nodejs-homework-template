const express = require("express");
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
    const contacts = await listContacts();
    res.json(contacts);
});

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    const contactById = await getContactById(id);
    if (contactById) {
        res.json(contactById);
    }
    res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
    const validation = schemaForAddContact.validate(req.body);

    if (validation.error) {
        res.status(400).json({ message: validation.error.message });
    } else {
        const array = await listContacts();
        const id = array.length + 1;
        req.body.id = `${id}`;
        const newContact = await addContact(req.body);
        res.status(201).json(newContact);
    }
});

router.delete("/:id", async (req, res, next) => {
    const deleteContact = await removeContact(req.params.id);
    if (deleteContact) {
        res.status(200).json({ message: "contact deleted" });
    } else res.status(404).json({ message: "Not found" });
});

router.put("/:id", async (req, res, next) => {
    const validation = schemaForUpdateContact.validate(req.body);
    const id = req.params.id;
    if (validation.error) {
        res.status(400).json({ message: validation.error.message });
    } else {
        const contact = await updateContact(id, req.body);
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ message: "Not found" });
        }
    }
});

module.exports = router;
