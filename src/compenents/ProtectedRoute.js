import { useNavigate } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {

    const user = localStorage.getItem("user");

    if ( !user || user.token != null ) {
        return <Navigate to="/login" />;
    }

    return (
        <Outlet />
    )

}


export default ProtectedRoute;
