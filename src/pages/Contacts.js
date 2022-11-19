import { useEffect, useState } from "react";
import { getContacts } from "../features/contacts/contactSlice";
import { useDispatch, useSelector } from "react-redux"

const Contacts = () => {

    const dispatch = useDispatch()
    const [contacts, setContacts] = useState([])
    
    useEffect(() => {

        dispatch(getContacts());

    }, [])

    return (
        <>
           Contact page is here
        </>
    )
}

export default Contacts;