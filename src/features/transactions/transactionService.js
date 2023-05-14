import axiosDefault from "../../utils/axios";

const TRANSACTION_LIST = "/transactions/list";

const transactionsList = async (page) => {
  const response = await axiosDefault.get(`${TRANSACTION_LIST}/${page}`);
  return response.data.data;
};

export default {
  transactionsList,
};
