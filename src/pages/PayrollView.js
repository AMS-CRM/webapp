import { useParams } from "react-router-dom";

import {
  Container,
  Grid,
  Title,
  Text,
  Card,
  Table,
  Badge,
  createStyles,
  Group,
} from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayroll, reset } from "../features/payrolls/payrollSlice";
import moment from "moment";

const colors = {
  "Under Review": "blue",
  Pending: "yellow",
  Processing: "black",
  Completed: "green",
  Error: "red",
};

const useStyles = createStyles((theme) => ({
  thead: {
    border: "none",
  },
  searchGrid: {
    marginTop: "8px",
    justifyContent: "right",
  },
  actionButtons: {
    textAlign: "right",
  },
}));
const PayrollView = () => {
  const { classes, cx } = useStyles();
  const { payroll } = useParams();
  const dispatch = useDispatch();
  const { payroll: data } = useSelector((state) => state.payroll);

  useEffect(() => {
    dispatch(getPayroll(payroll));
  }, [payroll]);

  return (
    <Container justify="space-between" mb="100px" className="page-content">
      <Grid>
        <Grid.Col span={6}>
          <>
            <Title order={3} mb="2px">
              Payroll
              {data &&
                `${data.payrollNo} - ${moment(data.createdOn).format(
                  "DD MMMM, YYYY"
                )}`}
            </Title>
            <Text color="dimmed" size="sm">
              Regular payroll weekly
            </Text>
          </>

          <Group mt="10px">
            <Text size="sm">Status:</Text>
            <Badge
              size="lg"
              mt="sm"
              mb="sm"
              color={data ? colors[data.status] : "black"}
            >
              {data && data.status}
            </Badge>
          </Group>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={3}>
          <Card radius="md" shadow="sm">
            <Text size="20px" weight={500}>
              {data && `$${data.payrollSummary?.grossAmount}`}
            </Text>
            <Title order={5} color="dimmed">
              Total Gross Amount
            </Title>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card radius="md" shadow="sm">
            <Text size="20px" weight={500}>
              {data && `$${data.payrollSummary?.netAmount}`}
            </Text>
            <Title order={5} color="dimmed">
              Total Net Amount
            </Title>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card radius="md" shadow="sm">
            <Text size="20px" weight={500}>
              {data && data.payroll && data.payroll.length}
            </Text>
            <Title order={5} color="dimmed">
              Total Employees
            </Title>
          </Card>
        </Grid.Col>
      </Grid>
      <Card radius="lg" shadow="lg" mt="lg">
        <Table mt="lg" verticalSpacing="xl">
          <thead className={classes.thead}>
            <tr>
              <th>Employee Name</th>
              <th>CPP</th>
              <th>EI</th>
              <th>Federal Tax</th>
              <th>Provincial Tax</th>
              <th>Income Tax</th>
              <th>Gross Amount</th>
              <th>Net Amount</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.payroll &&
              data.payroll.map((item) => {
                return (
                  <tr>
                    <td>{`${item.user.firstName} ${item.user.lastName}`}</td>
                    <td>${item.data.employeePayrollDeductions.CPP}</td>
                    <td>${item.data.employeePayrollDeductions.EI}</td>
                    <td>${item.data.employeePayrollDeductions.ITDfed}</td>
                    <td>${item.data.employeePayrollDeductions.ITDprov}</td>
                    <td>${item.data.employeePayrollDeductions.ITD}</td>
                    <td>${item.data.amount}</td>
                    <td>${item.data.netAmount}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default PayrollView;
