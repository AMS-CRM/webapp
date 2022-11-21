import axiosDefault from "../../utils/axios"

const GET_CONTACTS = "/contacts";

// Get the list of all contacts
const getContacts = async () => {

    const response = await axiosDefault.get(GET_CONTACTS);

    return response.data;

}

const contactService = {
    getContacts
}

export default contactService;