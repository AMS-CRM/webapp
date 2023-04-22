import axiosDefault from "../../utils/axios";

const PAYROLL = "/payroll";

// List the list of individual payrolls
const createPayroll = async (data) => {
  const response = await axiosDefault.post(PAYROLL, data);
  return response.data;
};

// List all the payrolls
const listPayroll = async () => {
  const response = await axiosDefault.get(PAYROLL);
  return response.data.data;
};

export default {
  createPayroll,
  listPayroll,
};
