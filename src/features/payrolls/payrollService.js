import axiosDefault from "../../utils/axios";

const PAYROLL = "/payroll";
const PAYROLL_APPROVE = "/payroll/approve";

// Approve a payroll
const approvePayroll = async (data) => {
  const response = await axiosDefault.put(PAYROLL_APPROVE, data);
  return response.data.data;
};

// List an individual payroll
const getPayroll = async (payroll) => {
  const response = await axiosDefault.get(`${PAYROLL}/${payroll}`);
  return response.data.data;
};

// List the list of individual payrolls
const createPayroll = async (data) => {
  const response = await axiosDefault.post(PAYROLL, data);
  return response.data.data;
};

// List all the payrolls
const listPayroll = async () => {
  const response = await axiosDefault.get(PAYROLL);
  return response.data.data;
};

export default {
  createPayroll,
  listPayroll,
  getPayroll,
  approvePayroll,
};
