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
  Select,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { hash } from "../utils/hash";
import getInitials from "../utils/getInitials";
import {
  transactionList,
  reset,
} from "../features/transactions/transactionSlice";
import { createElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

const colors = ["blue", "red", "orange", "yellow", "green", "teal", "purple"];

const etransferColor = {
  InProgress: "yellow.9",
  UnderReview: "purple.8",
  Successful: "green.9",
  Completed: "green.9",
  Pending: "yellow.9",
  Failed: "red.7",
  Cancelled: "red.7",
};

const Transactions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { page } = useParams();
  const [activePage, setActivePage] = useState(parseInt(page) || 1);
  const [searchQuery, setSearchQuery] = useState({});

  if (page >= 0) {
    page = 1;
  }

  const {
    transactions: { list, count, payrollsList },
  } = useSelector((state) => state.transaction);

  const onPageChange = (newPage) => {
    setActivePage(newPage);
    navigate(`/transactions/${newPage}`);
  };

  const largeScreen = useMediaQuery("(min-width: 1450px)");

  useEffect(() => {
    dispatch(transactionList({ page: activePage, ...searchQuery }));
    return () => dispatch(reset());
  }, [activePage, searchQuery]);

  const onFilterChange = (value, name) => {
    setSearchQuery({ ...searchQuery, [name]: value });
    setActivePage(1);
  };

  const rows =
    list &&
    list.map((transaction) => {
      return (
        <tr
          onClick={() =>
            navigate(
              `/payroll/${transaction.payroll.payrollNo}/${transaction.to._id}`
            )
          }
        >
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

          <td>
            <Text color="text">{transaction.to.email}</Text>
          </td>
        </tr>
      );
    });

  const payrollListData =
    payrollsList &&
    payrollsList.length != 0 &&
    payrollsList.map((payroll) => {
      return {
        label: `Payroll ${payroll.payrollNo}`,
        value: payroll._id,
      };
    });

  return (
    <Container size={largeScreen ? "xl" : "md"} className="page-content">
      <Grid>
        <Grid.Col span={12}>
          <Title order={3}>Transactions</Title>
          <Text color="dimmed" size="sm">
            List all transactions
          </Text>
        </Grid.Col>
      </Grid>

      <Card
        style={{ background: "#f9f9f9", overflow: "visible" }}
        withBorder
        shadow="sm"
        radius="md"
        my="20px"
      >
        <Grid>
          <Grid.Col span={3}>
            <Text color="gray.7" size="sm" weight={600} mb="6px" ml="4px">
              Status filter
            </Text>
            <Select
              placeholder="Status"
              dropdownPosition="bottom"
              name="search"
              variant="filled"
              zIndex={3}
              defaultValue={{}}
              value={searchQuery.status}
              data={[
                { value: {}, label: "All statues" },
                {
                  value: "successful",
                  label: "successul",
                },
                {
                  value: "failed",
                  label: "failed",
                },
              ]}
              onChange={(value) => onFilterChange(value, "status")}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Text color="gray.7" size="sm" weight={600} mb="6px" ml="4px">
              Payroll Filter
            </Text>
            <Select
              searchable
              variant="filled"
              dropdownPosition="bottom"
              placeholder="Choose Payroll"
              style={{ cursor: "pointer" }}
              name="payroll"
              defaultValue={{}}
              value={searchQuery.payroll}
              data={payrollListData || []}
              onChange={(value) => onFilterChange(value, "payroll")}
            />
          </Grid.Col>
        </Grid>
      </Card>

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
        page={activePage}
        mt="20px"
        total={count && Math.ceil(count / 10)}
        onChange={onPageChange}
      />
    </Container>
  );
};
export default Transactions;
