import axiosDefault from "../../utils/axios";
import axios from "axios"
const REGISTER = "/auth/register"

// Register new user
const register = async (data) => {

    const response = await axiosDefault.post(REGISTER, data)
   

    if ( response.data ) {
        localStorage.setItem("user", JSON.stringify(response.data.data))
    }

    return response.data.data;

}


const authService = {
    register
}

export default authService