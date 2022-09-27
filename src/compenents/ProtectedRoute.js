import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {

    const navigate = useNavigate();
    const user = localStorage.getItem(user);

    if ( !user || user.token == null ) {
        return navigate("/login")
    }

    return (
        <outlet />
    )

}


export default ProtectedRoute;
