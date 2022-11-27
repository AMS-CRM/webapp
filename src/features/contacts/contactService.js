import axiosDefault from "../../utils/axios"

const GET_CONTACTS = "/contacts";

// Get the list of all contacts
const getContacts = async (data) => {

    const URL = !data.keyword ? `${GET_CONTACTS}/${data.page}` : `${GET_CONTACTS}/${data.page}/${data.search}/${data.keyword}`
    const response = await axiosDefault.get(URL);
    return response.data;

}

const contactService = {
    getContacts
}

export default contactService;