import {
  Container,
  Card,
  Avatar,
  Text,
  Group,
  Grid,
  Button,
  Select,
  Badge,
  Tabs,
  Input,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import {
  IconCurrencyDollar,
  IconDownload,
  IconLock,
  IconQuestionCircle,
  IconTimeline,
} from "@tabler/icons";
import {
  editContact,
  getContactWithEmail,
  reset,
} from "../features/contacts/contactSlice";
import {
  getPayStubDownloadLink,
  reset as payrollReset,
} from "../features/payrolls/payrollSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import emptyImg from "../assets/empty.png";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useError } from "../hooks/useError";
import { hash } from "../utils/hash";
import getInitials from "../utils/getInitials";
import { useMediaQuery } from "@mantine/hooks";

const colors = ["blue", "red", "orange", "yellow", "green", "teal", "purple"];

const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useParams();
  const [errors, setErrors] = useError("contacts");
  const { contact, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.contacts
  );
  const {
    isLoading: payStubLoading,
    isSuccess: payStubSuccess,
    isError: payStubError,
    message: payStubMessage,
    paystubURL,
  } = useSelector((state) => state.payroll);
  const [salaryFormData, setSalaryFormData] = useState({});
  const largeScreen = useMediaQuery("(min-width: 1450px)");

  useEffect(() => {
    if (email) {
      dispatch(getContactWithEmail(email));
    }

    return () => {
      dispatch(reset());
      dispatch(payrollReset());
    };
  }, [email]);

  useEffect(() => {
    if (!salaryFormData.user && contact.length != 0) {
      setSalaryFormData({
        user: contact._id,
        payroll: {
          securityAnswer: contact.payroll.securityAnswer,
          securityQuestion: contact.payroll.securityQuestion,
        },
        salary: {
          wage: contact.salary.wage,
          payCycle: contact.salary.payCycle,
        },
      });
    }

    if (payStubSuccess && paystubURL) {
      window.location.href = paystubURL;

      dispatch(payrollReset());
    }
  }, [contact, payStubSuccess, paystubURL]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(editContact(salaryFormData));
  };
  return (
    contact != "" && (
      <Container size={largeScreen ? "xl" : "md"} className="page-content">
        <Grid align="center" mb="20px">
          <Grid.Col span={12} spacing="xs">
            <Group>
              <Avatar
                color={colors[hash(`${contact.firstName} ${contact.lastName}`)]}
                radius="xl"
                variant="filled"
                size="md"
              >
                <Text>
                  {getInitials(`${contact.firstName} ${contact.lastName}`)}
                </Text>
              </Avatar>
              <div>
                <Text
                  size="xl"
                  weight={600}
                >{`${contact.firstName} ${contact.lastName}`}</Text>
                <Text color="dimmed" size="sm">
                  {contact.email}
                </Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col>
            <Group>
              <Badge
                color={contact.status == "Active" ? "green" : "red"}
                size="lg"
                variant="light"
              >
                {contact.status}
              </Badge>
              <Text size="sm">
                since {moment(contact.createOn).format("DD MMMM, YYYY")}
              </Text>
            </Group>
          </Grid.Col>
        </Grid>
        <Tabs variant="pills" radius="md" defaultValue="summary">
          <Tabs.List>
            <Tabs.Tab value="summary">Summary</Tabs.Tab>
            <Tabs.Tab value="payroll">Payroll</Tabs.Tab>
            <Tabs.Tab value="wages">Wages</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="wages" pt="xs" my="lg">
            <Grid>
              <Grid.Col span={5}>
                <Card style={{ backgroundColor: "#f9f9f9" }} p="xl">
                  <Text color="gray.7" weight={600}>
                    Employee Salary
                  </Text>
                  <Grid justify="space-between" align="center" mt="10px">
                    <Grid.Col span={12} mb="20px">
                      <Select
                        variant="unstyled"
                        defaultValue="Hourly"
                        weight={600}
                        style={{ padding: "0" }}
                        className="selectInput"
                        data={[{ value: "Hourly", label: "Hourly" }]}
                      />
                      <Text size="xs" color="dimmed">
                        Employee wage type
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Select
                        variant="unstyled"
                        className="selectInput"
                        onChange={(value) => {
                          console.log(value);
                          setSalaryFormData({
                            ...salaryFormData,
                            salary: {
                              ...salaryFormData.salary,
                              payCycle: value,
                            },
                          });
                        }}
                        error={errors && errors["salary.payCycle"]}
                        value={salaryFormData.salary?.payCycle}
                        style={{ padding: "0" }}
                        data={[
                          { value: "Daily", label: "Daily" },
                          { value: "Weekly", label: "Weekly" },
                          { value: "Bi-Weekly", label: "Bi-Weekly" },
                          { value: "Semi-Monthly", label: "Semi-Monthly" },
                          { value: "Monthly", label: "Monthly" },
                          { value: "Annual", label: "Annual" },
                        ]}
                      />
                      <Text size="xs" color="dimmed">
                        Payroll run cycle
                      </Text>
                    </Grid.Col>

                    <Grid.Col span={6} mt="10px">
                      <Text size="sm" weight={600}>
                        Wage
                      </Text>
                      <Text size="xs" color="dimmed">
                        Employee hourly salary
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Input.Wrapper>
                        <TextInput
                          radius="md"
                          onChange={(e) =>
                            setSalaryFormData({
                              ...salaryFormData,
                              payroll: contact.payroll.hours && {
                                amount:
                                  Number(e.target.value) *
                                    contact.payroll.hours +
                                  contact.payroll.extraPay,
                              },
                              salary: {
                                ...salaryFormData.salary,
                                wage: e.target.value,
                              },
                            })
                          }
                          error={errors && errors["salary.wage"]}
                          value={salaryFormData.salary?.wage}
                          withBorder={false}
                          icon={<IconCurrencyDollar size="1rem" />}
                          variant="filled"
                        />
                      </Input.Wrapper>
                    </Grid.Col>
                  </Grid>
                </Card>
              </Grid.Col>

              <Grid.Col span={7}>
                <Card style={{ backgroundColor: "#f9f9f9" }} p="xl">
                  <Text color="gray.7" weight={600}>
                    Trasfer details
                  </Text>
                  <Grid justify="space-between" align="center" mt="10px">
                    <Grid.Col span={12} mb="20px">
                      <Select
                        variant="unstyled"
                        defaultValue="E-transfer"
                        weight={600}
                        style={{ padding: "0" }}
                        className="selectInput"
                        data={[{ value: "E-transfer", label: "E-transfer" }]}
                      />
                      <Text size="xs" color="dimmed">
                        Salary transfer type
                      </Text>
                    </Grid.Col>

                    <Grid.Col span={6} mt="10px">
                      <Text size="sm" weight={600}>
                        Security Question
                      </Text>
                      <Text size="xs" color="dimmed">
                        Security Question for E-Transfer
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Input.Wrapper>
                        <TextInput
                          radius="md"
                          value={salaryFormData?.payroll?.securityQuestion}
                          onChange={(e) =>
                            setSalaryFormData({
                              ...salaryFormData,
                              payroll: {
                                securityQuestion: e.target.value,
                              },
                            })
                          }
                          error={errors && errors["payroll.securityQuestion"]}
                          withBorder={false}
                          icon={<IconQuestionCircle size="1rem" />}
                          variant="filled"
                        />
                      </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={6} mt="10px">
                      <Text size="sm" weight={600}>
                        Security Answer
                      </Text>
                      <Text size="xs" color="dimmed">
                        Security answer for E-Transfer
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Input.Wrapper>
                        <PasswordInput
                          radius="md"
                          withBorder={false}
                          value={salaryFormData?.payroll?.securityAnswer}
                          onChange={(e) =>
                            setSalaryFormData({
                              ...salaryFormData,
                              payroll: {
                                securityAnswer: e.target.value,
                              },
                            })
                          }
                          error={errors && errors["payroll.securityAnswer"]}
                          icon={<IconLock size="1rem" />}
                          variant="filled"
                        />
                      </Input.Wrapper>
                    </Grid.Col>
                  </Grid>
                </Card>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={12} mt="20px">
                <Button
                  variant="outline"
                  style={{ float: "right" }}
                  onClick={(e) => handleFormSubmit(e)}
                  loading={isLoading}
                >
                  Save changes
                </Button>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="summary" pt="xs" my="lg">
            <Grid>
              <Grid.Col span={largeScreen ? 4 : 5}>
                <Card radius="md" withBorder>
                  <Text my="10px" weight={400}>
                    Total Earnings
                  </Text>

                  <Grid justify="space-between">
                    <div>
                      <Text weight={600} size="30px">
                        <Text
                          weight={600}
                          color="dimmed"
                          size="20px"
                          display="inline"
                        >
                          $
                        </Text>
                        {contact.totalGrossAmount.toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}
                      </Text>
                    </div>
                    <div>
                      <Button color="blue" variant="light">
                        Run payroll
                      </Button>
                    </div>
                  </Grid>
                </Card>
                <Card radius="md" mt="10px" withBorder>
                  <Text my="10px" mb="20px">
                    Employee Details
                  </Text>
                  <Card
                    style={{ background: "#f9f9f9" }}
                    radius="md"
                    mb="10px"
                    py="xl"
                  >
                    <Grid justify="space-between">
                      <Grid.Col span="auto">
                        <Text size="sm">Email Address</Text>
                      </Grid.Col>
                      <Grid.Col span="auto">
                        <Text weight={500} size="sm">
                          {contact.email}
                        </Text>
                      </Grid.Col>
                    </Grid>
                  </Card>
                  <Card
                    style={{ background: "#f9f9f9" }}
                    radius="md"
                    mb="10px"
                    py="xl"
                  >
                    <Grid justify="space-between">
                      <Grid.Col span="auto">
                        <Text size="sm">Phone Number</Text>
                      </Grid.Col>
                      <Grid.Col span="auto">
                        <Text weight={500} size="sm">
                          {contact.phone.number}
                        </Text>
                      </Grid.Col>
                    </Grid>
                  </Card>{" "}
                  <Card
                    style={{ background: "#f9f9f9" }}
                    radius="md"
                    mb="10px"
                    py="xl"
                  >
                    <Grid justify="space-between">
                      <Grid.Col span="auto">
                        <Text size="sm">Date of birth</Text>
                      </Grid.Col>
                      <Grid.Col span="auto">
                        <Text weight={500} size="sm">
                          {moment(contact.dob).format("DD MMMM, YYYY")}
                        </Text>
                      </Grid.Col>
                    </Grid>
                  </Card>
                  <Card
                    style={{ background: "#f9f9f9" }}
                    radius="md"
                    mb="10px"
                    py="xl"
                  >
                    <Grid justify="space-between">
                      <Grid.Col span="auto">
                        <Text size="sm">Employee Id</Text>
                      </Grid.Col>
                      <Grid.Col span="auto">
                        <Text weight={500} size="sm">
                          {contact.passport}
                        </Text>
                      </Grid.Col>
                    </Grid>
                  </Card>
                </Card>
              </Grid.Col>
              <Grid.Col span="auto">
                <Card radius="md" withBorder p="xl">
                  <Text my="10px" weight={400}>
                    Payroll History
                  </Text>
                  {contact && contact.payRunHistory.length != 0 ? (
                    contact.payRunHistory.map((payroll) => {
                      return (
                        <Card
                          style={{ background: "#f9f9f9" }}
                          radius="md"
                          mb="10px"
                        >
                          <Grid justify="space-between" align="center" p="10px">
                            <Grid.Col span={4}>
                              <Text weight="500" size="sm">
                                Payroll
                                {moment(payroll.createdOn).format(
                                  "DD MMMM, YYYY"
                                )}
                              </Text>
                              <Text color="dimmed" size="xs">
                                Weekly Regular
                              </Text>
                              <Button
                                mt="10px"
                                size="sm"
                                mr="8px"
                                disabled={!payroll.payroll.payStub && true}
                                loading={payStubLoading}
                                onClick={() => {
                                  dispatch(
                                    getPayStubDownloadLink({
                                      userId: contact._id,
                                      payrollId: payroll._id,
                                    })
                                  );
                                }}
                              >
                                <Text>Paystub</Text>
                                <IconDownload size="1rem" />
                              </Button>
                              <Link to={`/payrolls/${payroll.payrollNo}`}>
                                <Button mt="10px" size="sm" variant="outline">
                                  View Payroll
                                </Button>
                              </Link>
                            </Grid.Col>
                            <Grid.Col span={4}>
                              <Text align="right" size="24px" weight={600}>
                                ${payroll.payroll.data.amount}
                                <Text color="dimmed" size="sm">
                                  Gross amount
                                </Text>
                              </Text>
                            </Grid.Col>
                          </Grid>
                        </Card>
                      );
                    })
                  ) : (
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                      <img src={emptyImg} width="200px" />
                      <Text>No payroll for the user is found</Text>
                    </div>
                  )}
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="payroll" pt="xs" my="lg">
            <Grid grow gutter="xl">
              <Grid.Col span={4}>
                <Card radius="md" withBorder>
                  <Text mb="20px" weight={500}>
                    Total payrolls
                  </Text>
                  <Card m="0" p="0" my="10px">
                    <Grid justify="between">
                      <Grid.Col span="auto">
                        <Text weight={500}>CPP</Text>
                      </Grid.Col>
                      <Grid.Col span="auto" align="right">
                        <Text>${contact.totalCPP}</Text>
                      </Grid.Col>
                    </Grid>
                  </Card>
                  <Card m="0" p="0" mb="10px">
                    <Grid justify="between">
                      <Grid.Col span="auto">
                        <Text weight={500}>EI</Text>
                      </Grid.Col>
                      <Grid.Col span="auto" align="right">
                        <Text>${contact.totalEI}</Text>
                      </Grid.Col>
                    </Grid>
                  </Card>
                  <Card m="0" p="0" mb="10px">
                    <Grid justify="between">
                      <Grid.Col span="auto">
                        <Text weight={500}>Federal Taxes</Text>
                      </Grid.Col>
                      <Grid.Col span="auto" align="right">
                        <Text>${contact.totalITDfed}</Text>
                      </Grid.Col>
                    </Grid>
                  </Card>
                  <Card m="0" p="0" mb="10px">
                    <Grid justify="between">
                      <Grid.Col span="auto">
                        <Text weight={500}>Provincal Taxes</Text>
                      </Grid.Col>
                      <Grid.Col span="auto" align="right">
                        <Text>${contact.totalITDprov}</Text>
                      </Grid.Col>
                    </Grid>
                  </Card>
                  <Card m="0" p="0" mb="10px">
                    <Grid justify="between">
                      <Grid.Col span="auto">
                        <Text weight={500}>Income taxes</Text>
                      </Grid.Col>
                      <Grid.Col span="auto" align="right">
                        <Text>${contact.totalITD}</Text>
                      </Grid.Col>
                    </Grid>
                  </Card>
                </Card>
              </Grid.Col>
              <Grid.Col span={7}>
                <Card radius="sm" p="30px" withBorder>
                  <Text mt="36px" weight={600} size="xl">
                    {contact.payRunHistory.length}
                  </Text>
                  <Text mb="20px" color="dimmed" size="sm">
                    Total number of payrolls
                  </Text>
                  <Text mt="36px" weight={600} size="xl">
                    {contact.totalGrossAmount}
                  </Text>
                  <Text mb="20px" color="dimmed">
                    Total Gross amount ( CAD )
                  </Text>
                  <Text mt="36px" weight={600} size="xl">
                    ${contact.totalNetAmount}
                  </Text>
                  <Text mb="20px" color="dimmed">
                    Total net amount ( CAD )
                  </Text>
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
        </Tabs>
      </Container>
    )
  );
};

export default Contact;
