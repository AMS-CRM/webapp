import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import HeaderTabs from "./Header" 

import appIcon from "../assets/icons/applications.png";
import programsIcon from "../assets/icons/programs.png";
import usersIcon from "../assets/icons/users.png";
import documentsIcon from "../assets/icons/documents.png";
import ApplicationForm from "./ApplicationForm";

  
const links = [
    {
        link: "/Applications1",
        label: "Applications",
        icon: appIcon
    },
    {
        link: "/Applications2",
        label: "Programs",
        icon: programsIcon

    },
    {
        link: "/Applications3",
        label: "Users",
        icon: usersIcon

    },
    {
        link: "/Applications4",
        label: "Documents",
        icon: documentsIcon

    }
]

const ProtectedRoute = ({children}) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const [ formStatus, setFormStatus ] = useState(false);

    if ( !user || user.token == null ) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <HeaderTabs 
                links={links} 
                toggleOpened={setFormStatus} 
                toggleOpenedStatus={formStatus} 
            />
            <ApplicationForm onClose={setFormStatus} opened={formStatus} />
            <Outlet />
        </>
    )

}


export default ProtectedRoute;
