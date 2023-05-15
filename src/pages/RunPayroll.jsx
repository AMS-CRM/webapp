import { useEffect, useState, useRef, useMemo, createRef } from "react";
import {
  getContacts,
  editContact,
  reset,
} from "../features/contacts/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import getInitials from "../utils/getInitials";
import { hash } from "../utils/hash";
import TableLoader from "../compenents/TableLoader";
import { useError } from "../hooks/useError";
import SendSmS from "../compenents/SendSmS";
import { showNotification } from "@mantine/notifications";
import {
  approvePayroll,
  payrollCreate,
  reset as payrollReset,
} from "../features/payrolls/payrollSlice";
import { useMediaQuery } from "@mantine/hooks";

import {
  Avatar,
  Badge,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Title,
  Pagination,
  Card,
  PasswordInput,
  Container,
  Table,
  Button,
  Modal,
  Loader,
  createStyles,
  Grid,
  Input,
  Select,
  Checkbox,
  Menu,
  TextInput,
} from "@mantine/core";
import {
  IconSearch,
  IconClipboardList,
  IconCloudSnow,
  IconDeviceFloppy,
  IconCircleX,
  IconClock,
  IconCurrencyDollar,
} from "@tabler/icons";
import Empty from "../layout/Empty.js";

const useStyles = createStyles((theme) => ({
  thead: {
    background: "#F9F9F9",
  },
  searchGrid: {
    marginTop: "8px",
    justifyContent: "right",
  },
  actionButtons: {
    textAlign: "right",
  },
}));

const colors = ["blue", "red", "orange", "yellow", "green", "teal", "purple"];

const RunPayroll = () => {
  const dispatch = useDispatch();
  const { page } = useParams();
  const navigate = useNavigate();
  const { classes, cx } = useStyles();
  const {
    contacts: { data },
    isLoading,
    isSuccess,
    isError,
    message,
  } = useSelector((state) => state.contacts);

  const {
    isLoading: payrollLoading,
    isSuccess: payrollSuccess,
    isError: payrollError,
    message: payrollErrorMessage,
    payrollRun: payrollRunData,
  } = useSelector((state) => state.payroll);
  const [pages, setPages] = useState(0);
  const [activePage, setActivePage] = useState(parseInt(page) || 1);
  const [error, setError] = useError("contacts");
  const [currentInput, setCurrentInput] = useState("");
  const [searchQuery, setSearchQuery] = useState({
    keyword: "",
    search: "email",
  });
  const { keyword, search } = searchQuery;
  const [opened, setOpened] = useState(false);
  const [seletedItem, setSelectedItem] = useState(false);
  const [checked, setChecked] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sendSmSOpened, setSendSmS] = useState(false);
  const [payrollModal, setPayrollModal] = useState(false);
  const [saveStatus, setSavedStatus] = useState(true);
  const [errors, setErrors] = useState([]);
  const rows = useRef({});
  const largeScreen = useMediaQuery("(min-width: 1450px)");
  const { formStatus, setFormStatus } = useOutletContext();

  useEffect(() => {
    dispatch(getContacts({ page }));
    return () => {
      dispatch(payrollReset());
    };
  }, []);

  useEffect(() => {
    if (data && data.count) {
      setPages(Math.ceil(data.count / 10));
    }

    if (isSuccess && seletedItem) {
      dispatch(getContacts({ page }));
      setSelectedItem(false);
      setOpened(false);
    }

    if (payrollModal && payrollSuccess) {
      //  navigate("/Payrolls");
    }

    if (payrollError && payrollErrorMessage[0]["msg"]) {
      showNotification({
        title: "Error",
        color: "red",
        position: "top-right",
        message: payrollErrorMessage[0]["msg"] || "Something went wrong",
      });
    }

    if (payrollError && typeof payrollErrorMessage == "object") {
      setErrors(payrollErrorMessage);
    }

    setSavedStatus(!isLoading);
  }, [data, isSuccess, isLoading, payrollSuccess, payrollError, dispatch]);

  const setPage = (page) => {
    dispatch(getContacts({ page }));
    navigate(`/Payrolls/run/${page}`);
    setActivePage(page);
  };

  const onChange = (e) => {
    setSearchQuery((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));

    dispatch(getContacts({ page: 0, search, keyword: e.target.value }));
  };

  const searchBy = (search) => {
    setSearchQuery((state) => ({
      ...state,
      search,
    }));

    setSavedStatus(true);
    dispatch(getContacts({ page: 0, search, keyword }));
  };

  // Hanlde how the app reacts when on checkbox event
  const handleCheckedItems = (itemId) => {
    // Remove the item if already selected
    if (checked.includes(itemId)) {
      setChecked(checked.filter((item) => item !== itemId));
    } else {
      setChecked([...checked, itemId]);
    }
  };

  // Decide if the item is selected
  const itemCheckedStatus = (itemId) => {
    // If everything is seleted and items exists in checked list it's an uncheck
    if (selectAll) {
      if (checked.includes(itemId)) {
        return false;
      }
      // Item exists in checked list it's unchecked
      return true;
    }

    // Item is simply selected without select all it'a a checked
    if (!selectAll && checked.includes(itemId)) {
      return true;
    }

    // Default case if false
    return false;
  };

  const onInputChange = (e, user, grossAmount, type = "payroll") => {
    setError();
    // Compose the data for the
    dispatch(
      editContact({
        user,
        [type]: {
          [e.target.name]: e.target.value,
          amount: grossAmount,
        },
      })
    );
  };

  const handleRunPayroll = () => {
    dispatch(
      payrollCreate({
        selectAll,
        user: checked,
        [searchQuery.keyword != "" && searchQuery.search]: searchQuery.keyword,
      })
    );
    setPayrollModal(true);
    setErrors([]);
  };

  const sheet =
    data &&
    data.contacts.length > 0 &&
    data.contacts.map((item) => (
      <Card
        radius="md"
        mb="20px"
        py="xl"
        style={{
          background: "#f9f9f9",
        }}
      >
        <Grid key={item._id} align="center">
          <Grid.Col span={4}>
            <Group align="center" justifyContent="" gutter="xs">
              <Checkbox
                size="xs"
                color="blue"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheckedItems(item._id);
                }}
                mt="6px"
                checked={itemCheckedStatus(item._id)}
              />
              <Avatar
                color={colors[hash(item.firstName)]}
                radius="xl"
                variant="filled"
                size="md"
              >
                {getInitials(`${item.firstName} ${item.lastName}`)}
              </Avatar>

              <Text size="sm" weight={500}>
                {`${item.firstName} ${item.lastName}`}
                <Text size="sm" color="dimmed">
                  {item.email}
                </Text>
              </Text>
            </Group>
          </Grid.Col>

          <Grid.Col span={2}>
            <Input.Wrapper
              style={{ width: "120px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <TextInput
                name="hours"
                size="sm"
                withBorder
                radius="sm"
                variant="unstyled"
                weight={600}
                icon={<IconClock size="1rem" />}
                onChange={(e) => {
                  const grossAmount = (
                    (Number(
                      rows.current[`${item._id}_hours`].value *
                        rows.current[`${item._id}_wage`].value
                    ) *
                      100 +
                      Number(rows.current[`${item._id}_extraPay`].value) *
                        100) /
                    100
                  ).toFixed(2);

                  rows.current[`${item._id}_amount`].value = grossAmount;
                  setSavedStatus(false);
                  setCurrentInput(`${item._id}_hours`);
                }}
                mt="5px"
                ref={(el) => (rows.current[`${item._id}_hours`] = el)}
                defaultValue={item.payroll.hours}
                error={
                  error &&
                  error["payroll.hours"] &&
                  currentInput == `${item._id}_hours`
                }
                onBlur={(e) =>
                  onInputChange(
                    e,
                    item._id,
                    rows.current[`${item._id}_amount`].value
                  )
                }
              />
            </Input.Wrapper>
            <Text mb="sm" size="xs" color="dimmed" mt="5px">
              Work Hours
            </Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Input.Wrapper
              style={{ width: "120px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <TextInput
                name="wage"
                size="sm"
                withBorder
                radius="sm"
                variant="unstyled"
                weight={600}
                icon={<IconCurrencyDollar size="1rem" />}
                onChange={(e) => {
                  const grossAmount = (
                    (Number(
                      rows.current[`${item._id}_hours`].value *
                        rows.current[`${item._id}_wage`].value
                    ) *
                      100 +
                      Number(rows.current[`${item._id}_extraPay`].value) *
                        100) /
                    100
                  ).toFixed(2);

                  rows.current[`${item._id}_amount`].value = grossAmount;
                  setSavedStatus(false);
                  setCurrentInput(`${item._id}_wage`);
                }}
                mt="5px"
                ref={(el) => (rows.current[`${item._id}_wage`] = el)}
                defaultValue={item.salary.wage}
                error={
                  error &&
                  error["payroll.hours"] &&
                  currentInput == `${item._id}_wage`
                }
                onBlur={(e) => {
                  setError();
                  // Compose the data for the
                  dispatch(
                    editContact({
                      user: item._id,
                      salary: {
                        [e.target.name]: e.target.value,
                      },
                      payroll: {
                        amount: rows.current[`${item._id}_amount`].value,
                      },
                    })
                  );
                }}
              />
            </Input.Wrapper>
            <Text mb="sm" size="xs" color="dimmed" mt="5px">
              Hourly wage
            </Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Input.Wrapper
              style={{ width: "150px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <TextInput
                name="extraPay"
                size="sm"
                onChange={() => {
                  const grossAmount = (
                    (Number(
                      rows.current[`${item._id}_hours`].value *
                        rows.current[`${item._id}_wage`].value
                    ) *
                      100 +
                      Number(rows.current[`${item._id}_extraPay`].value) *
                        100) /
                    100
                  ).toFixed(2);

                  rows.current[`${item._id}_amount`].value = grossAmount;
                  setSavedStatus(false);
                  setCurrentInput(`${item._id}_extraPay`);
                }}
                radius="sm"
                variant="unstyled"
                icon={<IconCurrencyDollar size="1rem" />}
                error={
                  error &&
                  error["payroll.extraPay"] &&
                  currentInput == `${item._id}_extraPay`
                }
                onBlur={(e) =>
                  onInputChange(
                    e,
                    item._id,
                    rows.current[`${item._id}_amount`].value
                  )
                }
                ref={(el) => (rows.current[`${item._id}_extraPay`] = el)}
                defaultValue={item.payroll.extraPay}
              />
            </Input.Wrapper>
            <Text mb="sm" size="xs" color="dimmed" mt="5px">
              Vaction pay
            </Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Input.Wrapper style={{ width: "150px" }} key={item.payroll.amount}>
              <Input
                name="amount"
                size="xs"
                radius="sm"
                variant="unstyled"
                icon={<IconCurrencyDollar size="1rem" />}
                className="inputBold"
                ref={(el) => (rows.current[`${item._id}_amount`] = el)}
                defaultValue={item.payroll.amount}
                disabled
              />
            </Input.Wrapper>
            <Text mb="sm" size="xs" color="dimmed" mt="5px">
              Gross Amount
            </Text>
          </Grid.Col>
        </Grid>
      </Card>
    ));

  return (
    <Container size={largeScreen ? "xl" : "md"} className="page-content">
      <Modal
        opened={payrollModal}
        onClose={() => {
          setPayrollModal(false);
          setErrors([]);
        }}
        title="Review payroll summary"
        size="80%"
      >
        {payrollRunData.users && payrollRunData.users.length != 0 && (
          <>
            <Grid mb="md">
              <Grid.Col span={4}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Text weight="bold">Gross amount:</Text> $
                  {payrollRunData.totalAmount}
                </Card>
              </Grid.Col>
              <Grid.Col span={4}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Text weight="bold">Employees:</Text>
                  {payrollRunData.users.length} Employees
                </Card>
              </Grid.Col>
            </Grid>

            <Table
              mb="lg"
              verticalSpacing="md"
              striped
              withBorder
              withColumnBorders
            >
              <thead>
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
                {payrollRunData.users.map((user) => {
                  return (
                    <tr>
                      <td>{user.name}</td>

                      <td>${user.CPP}</td>
                      <td>${user.EI}</td>
                      <td>${user.ITDfed}</td>
                      <td>${user.ITDprov}</td>
                      <td>${user.ITD}</td>
                      <td>${user.grossAmount}</td>
                      <td>${user.netAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
        {errors.length != 0 && (
          <Table
            mb="lg"
            verticalSpacing="md"
            striped
            withBorder
            withColumnBorders
          >
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Security Question</th>
                <th>Security Answer</th>
                <th>Amount</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {errors.map((error) => {
                return (
                  <tr>
                    <td>{error.email}</td>
                    <td>{`${error.firstName} ${error.lastName}`}</td>
                    <td>{error.payroll.securityQuestion}</td>
                    <td>{error.payroll.securityAnswer}</td>
                    <td>${error.payroll.amount}</td>
                    <td>
                      <Text color="red">{error.message}</Text>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        <Button
          float="right"
          onClick={() => {
            dispatch(approvePayroll({ payroll: payrollRunData.payroll }));
            navigate("/payrolls", { replace: true });
          }}
          loading={payrollLoading}
          mr="sm"
          disabled={errors.length != 0}
        >
          Approve
        </Button>
        <Button
          float="right"
          onClick={() => {
            setPayrollModal(false);
          }}
          loading={payrollLoading}
          variant="outline"
        >
          Cancel
        </Button>
      </Modal>
      <SendSmS opened={sendSmSOpened} setOpened={setSendSmS} />

      <Grid mb="10px" justify="space-between">
        <Grid.Col span={6}>
          <Title order={3}>Payroll</Title>
          <Text color="dimmed" size="sm" mb="30px">
            Create and manage the payrolls.
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Grid className={classes.searchGrid}>
            <Grid.Col span={5}>
              <Input
                icon={<IconSearch />}
                value={searchQuery.keyword}
                name="keyword"
                placeholder="Search keyword"
                onChange={(e) => onChange(e)}
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <Select
                placeholder="Search by"
                name="search"
                value={searchQuery.search}
                data={[
                  { value: "email", label: "Email Address" },
                  { value: "firstName", label: "Employee Name" },
                  { value: "employeeId", label: "Employee ID" },
                ]}
                onChange={(val) => searchBy(val)}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>

      <Grid mb="10px" justify="space-between">
        <Grid.Col span={6}>
          <Button variant="light" radius="xl" mr="10px" color="blue">
            <Checkbox
              label={<Text color="blue.9">Select All</Text>}
              size="xs"
              checked={selectAll}
              color="blue.9"
              onClick={(event) => setSelectAll(event.currentTarget.checked)}
            />
          </Button>
          {saveStatus ? (
            <Group position="center" display="inline">
              <IconCloudSnow
                size="20"
                style={{ top: "3px", position: "relative" }}
              />
              <Text display="inline" ml="5px">
                Saved
              </Text>
            </Group>
          ) : (
            <Group display="inline">
              <Loader size="20" style={{ top: "3px", position: "relative" }} />
              <Text display="inline">Saving...</Text>
            </Group>
          )}
        </Grid.Col>
        <Grid.Col span={3} offset={3} className={classes.actionButtons}>
          <Button
            onClick={() => handleRunPayroll()}
            disabled={selectAll == false && checked.length == 0}
          >
            Run Payroll
          </Button>
        </Grid.Col>
      </Grid>
      {isError ? (
        searchQuery.keyword != "" ? (
          <Title>No serach result found</Title>
        ) : (
          <Empty
            title="Onboard and manage employees"
            description="Onboarding employess to run payroll cycle and manage their salary. If you see this message click the button below to onboard your first employee."
            icon={<IconClipboardList size="40" />}
            formStatus={formStatus}
            setFormStatus={setFormStatus}
          />
        )
      ) : (
        <>
          <ScrollArea>
            <>
              <tbody>{sheet}</tbody>
            </>
          </ScrollArea>
          <Pagination
            total={pages}
            page={activePage}
            onChange={(page) => setPage(page)}
          />
        </>
      )}
    </Container>
  );
};

export default RunPayroll;
