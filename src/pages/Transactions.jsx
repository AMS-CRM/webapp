import {
  Grid,
  Table,
  Container,
  Text,
  Title,
  Badge,
  Card,
  Avatar,
  Group,
  Pagination,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { hash } from "../utils/hash";
import getInitials from "../utils/getInitials";
import {
  transactionList,
  reset,
} from "../features/transactions/transactionSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

const colors = ["blue", "red", "orange", "yellow", "green", "teal", "purple"];

const etransferColor = {
  "in progress": "black",
  successful: "green.9",
  completed: "purple",
  pending: "yellow.9",
  failed: "red",
  cancelled: "red",
};

const Transactions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { page } = useParams();
  const [activePage, setActivePage] = useState(page);

  if (page >= 0) {
    page = 1;
  }

  const {
    transactions: { list, count },
  } = useSelector((state) => state.transaction);

  const onPageChange = (newPage) => {
    setActivePage(newPage);
    navigate(`/transactions/${newPage}`);
  };

  const largeScreen = useMediaQuery("(min-width: 1450px)");

  useEffect(() => {
    dispatch(transactionList(activePage));
    return () => dispatch(reset());
  }, [activePage]);

  const rows =
    list &&
    list.map((transaction) => {
      return (
        <tr>
          <td>
            <Text weight={600}>
              $
              {transaction.amount.toLocaleString({
                maximumFractionDigits: 2,
              })}
            </Text>
          </td>

          <td>
            <Badge color={etransferColor[transaction.status]}>
              {transaction.status}
            </Badge>
          </td>
          <td>{transaction.transactionId}</td>
          <td>{moment(transaction.createdOn).format("DD MMMM, YYYY")}</td>
          <td>
            <Badge color="indigo.8" variant="light">
              {transaction.type}
            </Badge>
          </td>
          <td>Payroll {transaction.payroll.payrollNo}</td>

          <td>{transaction.to.email}</td>
        </tr>
      );
    });
  return (
    <Container size={largeScreen ? "xl" : "md"} className="page-content">
      <Grid>
        <Grid.Col span={6}>
          <Title order={3}>Transactions</Title>
          <Text color="dimmed" size="sm" mb="30px">
            List all transactions
          </Text>
        </Grid.Col>
      </Grid>
      <Card shadow="md" withBorder radius="md">
        <Table verticalSpacing="xs" horizontalSpace="xs" mb="30px">
          <thead mb="20px">
            <tr>
              <th>Amount ($)</th>
              <th>Status</th>
              <th>Ref. No</th>
              <th>Date Created</th>
              <th>Transfer Method</th>
              <th>Payroll</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Card>
      <Pagination
        mt="20px"
        total={count && Math.ceil(count / 10)}
        value={page}
        onChange={onPageChange}
        onNextPage={onPageChange}
        onPreviousPage={onPageChange}
      />
    </Container>
  );
};
export default Transactions;
