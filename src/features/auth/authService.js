import axiosDefault from "../../utils/axios";

const REGISTER = "/auth/register"
const LOGIN = "/auth/login"

// Register new user
const register = async (data) => {

    const response = await axiosDefault.post(REGISTER, data)

    if ( response.data ) {
        localStorage.setItem("user", JSON.stringify(response.data.data))
    }
    return response.data.data;

}

// Register new user
const login = async (data) => {

    const response = await axiosDefault.post(LOGIN, data)

    if ( response.data ) {
        localStorage.setItem("user", JSON.stringify(response.data.data))
    }

    return response.data.data;

}

const authService = {
    register,
    login
}

export default authService