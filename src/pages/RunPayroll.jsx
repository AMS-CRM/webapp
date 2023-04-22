import { useEffect, useState, useRef, useMemo } from "react";
import {
  getContacts,
  editContact,
  reset,
} from "../features/contacts/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import getInitials from "../utils/getInitials";
import { hash } from "../utils/hash";
import TableLoader from "../compenents/TableLoader";
import { useError } from "../hooks/useError";
import SendSmS from "../compenents/SendSmS";
import moment from "moment";
import { payrollCreate } from "../features/payrolls/payrollSlice";

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
  createStyles,
  Grid,
  Input,
  Select,
  Checkbox,
  Menu,
} from "@mantine/core";
import {
  IconSearch,
  IconClipboardList,
  IconDeviceFloppy,
  IconCircleX,
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
    isError,
    isSuccess,
  } = useSelector((state) => state.contacts);
  const { isLoading: payrollLoading } = useSelector((state) => state.payroll);
  const [pages, setPages] = useState(0);
  const [activePage, setActivePage] = useState(parseInt(page) || 1);
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
  const [formData, setFormData] = useRef({});
  console.log(formData);
  useMemo(() => {
    dispatch(getContacts({ page }));
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

    return () => dispatch(reset());
  }, [data, isSuccess, dispatch]);

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

  const onInputChange = (e, user) => {
    const data = {
      ...formData[user],
      [e.target.name]: e.target.value,
    };

    // Update the back-end based on the local state
    const payload = {
      user,
      payroll: data,
    };
    setFormData({
      ...formData,
      [user]: data,
    });
    // Send backend request
    dispatch(editContact(payload));
  };

  const openContact = (id) => {
    navigate(`/contact/${id}`);
  };

  const handleRunPayroll = () => {
    dispatch(payrollCreate({ selectAll, user: checked }));
  };

  const theme = useMantineTheme();
  const rows =
    data &&
    data.contacts.length > 0 &&
    data.contacts.map((item) => (
      <tr key={item._id} onClick={() => openContact(item._id)}>
        <td>
          <Group spacing="sm">
            <Checkbox
              size="xs"
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
            <div>
              <Text size="sm" weight={400}>
                {`${item.firstName} ${item.lastName}`}
              </Text>
              {/*
                <Text size="xs" weight={400} color="dimmed">
                  {item.email}
                </Text>
            */}
            </div>
          </Group>
        </td>

        <td>{item.passport}</td>
        <td>
          <Anchor size="sm" href="#">
            {item.email}
          </Anchor>
        </td>

        <td>
          <Input.Wrapper
            style={{ width: "120px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Input
              placeholder="Security Question "
              name="securityQuestion"
              size="sm"
              radius="md"
              onChange={(e) => onInputChange(e, item._id)}
              value={
                formData?.[item._id]?.securityQuestion ??
                item?.payroll?.securityQuestion
              }
            />
          </Input.Wrapper>
        </td>
        <td>
          <Input.Wrapper
            style={{ width: "100px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <PasswordInput
              placeholder="Last Name"
              name="securityAnswer"
              size="sm"
              radius="sm"
              onChange={(e) => onInputChange(e, item._id)}
              value={
                formData?.[item._id]?.securityAnswer ??
                item?.payroll?.securityAnswer
              }
            />
          </Input.Wrapper>
        </td>
        <td>
          <Input.Wrapper
            style={{ width: "100px" }}
            onClick={(e) => e.stopPropagation(e, item._id)}
          >
            <Input
              placeholder="amount"
              name="amount"
              size="sm"
              radius="sm"
              onChange={(e) => onInputChange(e, item._id)}
              value={
                formData?.[item._id]?.amount ?? item?.payroll?.amount ?? "0"
              }
            />
          </Input.Wrapper>
        </td>
      </tr>
    ));

  return (
    <Container size="xl" mb="100px" className="page-content">
      <Modal opened={payrollModal} onClose={() => setPayrollModal(false)}>
        <Text>Are you sure you want to run payroll?</Text>
        <Button onClick={() => handleRunPayroll()} loading={payrollLoading}>
          Run payroll
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
                  { value: "name", label: "Employee Name" },
                  { value: "studentId", label: "Employee ID" },
                  { value: "passport", label: "SIN Number" },
                ]}
                onChange={(val) => searchBy(val)}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>

      <Grid mb="10px" justify="space-between">
        <Grid.Col span={6}>
          <Button variant="outline" radius="xl" mr="10px">
            <Checkbox
              label={<Text>Select All</Text>}
              size="xs"
              checked={selectAll}
              onClick={(event) => setSelectAll(event.currentTarget.checked)}
            />
          </Button>
          <Button variant="outline" radius="xl" style={{ top: "3px" }}>
            <IconDeviceFloppy size="20" />
            <Text style={{ marginLeft: "5px" }}>Save</Text>
          </Button>
        </Grid.Col>
        <Grid.Col span={3} offset={3} className={classes.actionButtons}>
          <Button onClick={() => setPayrollModal(true)}>Run Payroll</Button>
        </Grid.Col>
      </Grid>

      {isError && !data ? (
        <Empty
          title="Create manage and delete contacts"
          description="Creating availability schedules allows you to manage availability across event types. They can be applied to one or more event types.              "
          icon={<IconClipboardList size="40" />}
        />
      ) : !false ? (
        <>
          <Card p="0" radius="md" mb="30px">
            <ScrollArea>
              <Table
                sx={{ minWidth: 800 }}
                verticalSpacing="xs"
                highlightOnHover
              >
                <thead className={classes.thead}>
                  <tr>
                    <th>Employee Name</th>
                    <th>Employee N</th>
                    <th>Email</th>
                    <th>Security question</th>
                    <th>Security Answer</th>
                    <th>Amount</th>
                    <th />
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </ScrollArea>
          </Card>
          <Pagination
            total={pages}
            page={activePage}
            onChange={(page) => setPage(page)}
          />
        </>
      ) : (
        <TableLoader />
      )}
    </Container>
  );
};

export default RunPayroll;
