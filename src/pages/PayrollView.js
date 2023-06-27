import { Navigate, useNavigate, useParams } from "react-router-dom";

import {
  Container,
  Grid,
  Title,
  Text,
  Card,
  Table,
  Button,
  Badge,
  createStyles,
  Group,
  Modal,
  Avatar,
  Anchor,
  Loader,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPayroll,
  approvePayroll,
  reset,
} from "../features/payrolls/payrollSlice";
import moment from "moment";
import { useMediaQuery } from "@mantine/hooks";
import PayrollViewSkelenton from "../compenents/PayrollViewSkelenton";
import { IconCheck } from "@tabler/icons";

const colors = {
  "Under Review": "blue",
  Pending: "yellow",
  Processing: "indigo",
  Completed: "green.9",
  Error: "red",
};

const etransferColor = {
  InProgress: "yellow.9",
  UnderReview: "purple.8",
  Successful: "green.9",
  Completed: "green.9",
  Pending: "yellow.9",
  Failed: "red.7",
  Cancelled: "red.7",
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [approveModal, setApproveModal] = useState(false);
  const [approval, setApproval] = useState(false);
  const {
    payroll: data,
    isLoading,
    isSuccess,
    isError,
    message,
  } = useSelector((state) => state.payroll);
  const largeScreen = useMediaQuery("(min-width: 1450px)");

  useEffect(() => {
    dispatch(getPayroll(payroll));
  }, [payroll]);

  useEffect(() => {
    if (isSuccess && approveModal) {
      showNotification({
        title: "Payroll approved",
        color: "green",
        position: "top-right",
        message: "Your payroll has been approved and processing",
      });
      setApproveModal(false);
    }
    if (isError && approveModal) {
      showNotification({
        title: "Error",
        color: "red",
        position: "top-right",
        message: message,
      });
      setApproveModal(false);
    }
  }, [isSuccess, isError]);

  const handleApprove = () => {
    dispatch(reset());

    dispatch(approvePayroll(data && { payroll: data._id }));
  };

  return (
    <Container size={largeScreen ? "xl" : "md"} className="page-content">
      <Modal
        opened={approveModal}
        size="lg"
        p="10px"
        withCloseButton={false}
        onClose={() => setApproveModal(false)}
        centered
        overlayOpacity={0.7}
        overlayBlur={3}
      >
        <Avatar
          color="green.9"
          radius="100%"
          style={{ float: "left", marginRight: "10px" }}
        >
          <IconCheck />
        </Avatar>

        <Title order={2}>Approve Payroll</Title>
        <Text size="md" color="dimmed" mb="20px">
          Are you sure you want to run this payroll. This step is irreversible.
        </Text>

        <Group position="right">
          <Anchor>
            <Text size="sm" onClick={() => setApproveModal(false)}>
              Cancel
            </Text>
          </Anchor>
          <Button loading={isLoading} onClick={() => handleApprove()}>
            Approve
          </Button>
        </Group>
      </Modal>
      {!isLoading ? (
        <>
          <Grid>
            <Grid.Col span={6}>
              <>
                <Title order={3} mb="2px">
                  Payroll{" "}
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
                  leftSection={
                    data.status == "Processing" && <Loader mt="8px" size="14" />
                  }
                  color={data ? colors[data.status] : "black"}
                >
                  {data && data.status}
                </Badge>
                <Button
                  variant="filled"
                  radius="xl"
                  width="160px"
                  size="xs"
                  onClick={() => setApproveModal(true)}
                  disabled={data.status != "Under Review"}
                >
                  Approve
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={3}>
              <Card radius="md" withBorder shadow="sm">
                <Text size="20px" weight={500}>
                  {data && `$${data.payrollSummary?.grossAmount}`}
                </Text>
                <Title order={5} color="dimmed">
                  Total Gross Amount
                </Title>
              </Card>
            </Grid.Col>
            <Grid.Col span={3}>
              <Card radius="md" withBorder shadow="sm">
                <Text size="20px" weight={500}>
                  {data && `$${data.payrollSummary?.netAmount}`}
                </Text>
                <Title order={5} color="dimmed">
                  Total Net Amount
                </Title>
              </Card>
            </Grid.Col>
            <Grid.Col span={3}>
              <Card radius="md" withBorder shadow="sm">
                <Text size="20px" weight={500}>
                  {data && data.payroll && data.payroll.length}
                </Text>
                <Title order={5} color="dimmed">
                  Total Employees
                </Title>
              </Card>
            </Grid.Col>
          </Grid>
          <Card radius="lg" withBorder mt="lg" shadow="sm">
            <Table mt="lg" verticalSpacing="xl">
              <thead className={classes.thead}>
                <tr>
                  <th>Employee Name</th>
                  <th>CPP</th>
                  <th>EI</th>
                  <th>Trasfer Status</th>
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
                      <tr
                        onClick={() =>
                          navigate(
                            `/payroll/${data.payrollNo}/${item.user._id}`
                          )
                        }
                      >
                        <td>{`${item.user.firstName} ${item.user.lastName}`}</td>
                        <td>${item.data.employeePayrollDeductions.CPP}</td>
                        <td>${item.data.employeePayrollDeductions.EI}</td>
                        <td>
                          <Badge
                            color={etransferColor[item?.transactionRef?.status]}
                          >
                            {item?.transactionRef?.status || "Processing"}
                          </Badge>
                        </td>
                        <td>${item.data.employeePayrollDeductions.ITD}</td>
                        <td>${item.data.amount}</td>
                        <td>${item.data.netAmount}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Card>
        </>
      ) : (
        <PayrollViewSkelenton />
      )}
    </Container>
  );
};

export default PayrollView;
