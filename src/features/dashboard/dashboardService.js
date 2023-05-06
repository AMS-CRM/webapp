import axiosDefault from "../../utils/axios";

// Set the URLS
const DASHBOARD = "/dashboard";

// Get the dashboard data
const dashboard = async () => {
  // Send the axios request
  const response = await axiosDefault.get(DASHBOARD);
  return response.data.data;
};

export default {
  dashboard,
};
