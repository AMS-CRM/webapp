import axiosDefault from "../../utils/axios";

const TRANSACTION_LIST = "/transactions/list";

const transactionsList = async (data) => {
  const response = await axiosDefault.post(TRANSACTION_LIST, data);
  return response.data.data;
};

export default {
  transactionsList,
};
