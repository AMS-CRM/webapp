import axiosDefault from "../../utils/axios";

const CONTACTS = "contacts";
const CONTACT = "contacts/get";

// Get the list of all contacts
const getContacts = async (data) => {
  const URL = !data.keyword
    ? `${CONTACTS}/${data.page}`
    : `${CONTACTS}/${data.page}/${data.search}/${data.keyword}`;
  const response = await axiosDefault.get(URL);
  return response.data;
};

// Get the individual contact
const getContactWithEmail = async (email) => {
  const response = await axiosDefault.get(`${CONTACT}/${email}`);
  return response.data.data;
};

// Create new contact
const createContact = async (data) => {
  const response = await axiosDefault.post(CONTACTS, data);
  return response.data;
};

// Create new contact
const deleteContact = async (data) => {
  const response = await axiosDefault.delete(CONTACTS, { data: { ...data } });
  return response.data;
};

// Edit the contact
const editContact = async (data) => {
  const response = await axiosDefault.put(CONTACTS, data);
  return response.data.data;
};

const contactService = {
  getContacts,
  createContact,
  deleteContact,
  editContact,
  getContactWithEmail,
};

export default contactService;
