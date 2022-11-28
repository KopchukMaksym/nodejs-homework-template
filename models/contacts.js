// const fs = require('fs/promises')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }

const fs = require("fs").promises;
const path = require("node:path");

const contactsPath = path.join(process.cwd(), "/models/contacts.json");
const listContacts = async () => {
    console.log(contactsPath);
    return fs

        .readFile(contactsPath)
        .then((data) => JSON.parse(data.toString()))
        .catch((err) => err.message);
};

const getContactById = async (contactId) => {
    return fs
        .readFile(contactsPath)
        .then((data) => JSON.parse(data.toString()))
        .then((data) => data.find((el) => el.id === contactId))
        .catch((err) => err.message);
};

const addContact = async (contact) => {
    const array = await listContacts();
    array.push(contact);
    fs.writeFile(contactsPath, JSON.stringify(array));
    return contact;
};

const removeContact = async (contactId) => {
    const array = await listContacts();
    const contact = array.find((el) => el.id === contactId);
    console.log(contact);
    if (contact) {
        const index = array.filter((el) => el.id !== contactId);
        console.log(index);
        fs.writeFile(contactsPath, JSON.stringify(index));
        return contactId;
    }
    return contact;
};
const updateContact = async (id, newContact) => {
    const array = await listContacts();
    const [contact] = array.filter((el) => el.id === id);
    Object.keys(newContact).map((el) => {
        contact[el] = newContact[el];
    });
    fs.writeFile(contactsPath, JSON.stringify(array));
    return contact;
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
};
