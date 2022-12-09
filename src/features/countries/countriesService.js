import axiosDefault  from "../../utils/axios";

const GET_COUNTRIES = "/countries";

const getCountries = async () => {

   const response = await axiosDefault.get(GET_COUNTRIES);
   return response.data;

}


export default { 
    getCountries
}