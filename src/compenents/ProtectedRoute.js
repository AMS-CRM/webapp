import { Outlet, Navigate } from "react-router-dom";
import HeaderTabs from "./Header" 

const ProtectedRoute = ({children}) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if ( !user || user.token == null ) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <HeaderTabs />
            <Outlet />
        </>
    )

}


export default ProtectedRoute;
