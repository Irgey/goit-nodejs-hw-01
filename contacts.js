const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return contacts;
}

async function getContactById(contactId) {
  const contacts = JSON.parse(await listContacts());

  const contactIndex = await contacts.findIndex(
    (contact) => contact.id === contactId
  );

  return contacts[contactIndex];
}

async function removeContact(contactId) {
  const contacts = JSON.parse(await listContacts());
  const contactIndex = await contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    console.log("no such id");
    return null;
  }
  const deletedContact = contacts.splice(contactIndex, 1);
  const resultContacts = await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
  return deletedContact;
}

async function addContact(name, email, phone) {
  const contacts = JSON.parse(await listContacts());
  const newContact = { name, email, phone, id: nanoid() };
  contacts.push(newContact);
  const newContacts = fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
