import axiosDefault from "../../utils/axios"

const CONTACTS = "contacts";

// Get the list of all contacts
const getContacts = async (data) => {

    const URL = !data.keyword ? `${CONTACTS}/${data.page}` : `${CONTACTS}/${data.page}/${data.search}/${data.keyword}`
    const response = await axiosDefault.get(URL);
    return response.data;

}


// Create new contact
const createContact = async ( data ) => {

    const response = await axiosDefault.post(CONTACTS, data)
    return response.data;
}

// Create new contact
const deleteContact = async ( data ) => {

    const response = await axiosDefault.delete(CONTACTS, {data: {...data}})
    return response.data;
}

const contactService = {
    getContacts,
    createContact,
    deleteContact
}

export default contactService;