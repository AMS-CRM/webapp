import {
  Container,
  Card,
  Avatar,
  Text,
  Group,
  Grid,
  Table,
  Title,
  Paper,
  Button,
  Tooltip,
  SimpleGrid,
  Badge,
  Tabs,
} from "@mantine/core";
import {
  IconArrowBarRight,
  IconArrowDown,
  IconChevronDown,
  IconChevronLeft,
  IconClipboard,
  IconClock,
  IconTimeline,
} from "@tabler/icons";
import { getContactWithEmail, reset } from "../features/contacts/contactSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import emptyImg from "../assets/empty.png";
import { useParams } from "react-router-dom";

const Contact = () => {
  const dispatch = useDispatch();
  const { email } = useParams();
  const { contact, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.contacts
  );
  useEffect(() => {
    if (email) {
      dispatch(getContactWithEmail(email));
    }
    return () => dispatch(reset());
  }, [email]);

  return (
    isSuccess &&
    contact && (
      <Container size="md" className="page-content">
        <Grid align="center" mb="20px">
          <Grid.Col span={12} spacing="xs">
            <Group>
              <Avatar size="lg" radius="100%" color="red">
                SS
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
              <Badge color="green" size="lg" variant="light">
                Active
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
          </Tabs.List>

          <Tabs.Panel value="summary" pt="xs" my="lg">
            <Grid>
              <Grid.Col span={5}>
                <Card radius="md" withBorder>
                  <Text my="10px" weight={400}>
                    Total Earnings
                  </Text>

                  <Grid justify="space-between" align="">
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
              <Grid.Col span={7}>
                <Card radius="md" withBorder>
                  <Text my="10px" weight={400}>
                    Payroll History
                  </Text>
                  {contact && contact.payRunHistory.length != 0 ? (
                    contact.payRunHistory.map((payroll) => {
                      return (
                        <Card
                          style={{ background: "#f1f1f1" }}
                          radius="md"
                          mb="10px"
                        >
                          <Grid justify="space-between">
                            <Grid.Col span={4}>
                              <Text weight="500" size="sm">
                                Payroll{" "}
                                {moment(payroll.createdOn).format(
                                  "DD MMMM, YYYY"
                                )}
                              </Text>
                              <Text color="dimmed" size="xs">
                                Weekly Regular
                              </Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
                              <Text align="right">
                                ${payroll.payroll.data.amount}
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
