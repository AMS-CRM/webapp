import {
  Container,
  Text,
  Group,
  Badge,
  Grid,
  Title,
  Card,
  LoadingOverlay,
  Button,
  Loader,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconArrowDown,
  IconArrowLeft,
  IconCashOff,
  IconCoins,
  IconDownload,
  IconRepeat,
} from "@tabler/icons";
import abstract from "../assets/abstract.png";
import abstract2 from "../assets/abstract2.png";
import pdf from "../assets/pdfwhite.png";

import {
  getEmployeePayroll,
  getPayStubDownloadLink,
  reset,
} from "../features/payrolls/payrollSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const etransferColor = {
  "in progress": "black",
  successful: "green.9",
  completed: "purple",
  pending: "yellow",
  failed: "red",
  cancelled: "red",
};

const SingleEmployeePayroll = () => {
  const { employeeId, payrollNo } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employeePayroll, isLoading, paystubURL } = useSelector(
    (state) => state.payroll
  );

  useEffect(() => {
    return () => dispatch(reset());
  }, []);

  useEffect(() => {
    dispatch(getEmployeePayroll({ employeeId, payrollNo }));
  }, [employeeId, payrollNo]);

  useEffect(() => {
    if (paystubURL) {
      window.location.href = paystubURL;
    }
  }, [paystubURL]);

  const largeScreen = useMediaQuery("(min-width: 1450px)");

  /*  if (isLoading) {
    return (
      <Container className="page-content" style={{ textAlign: "center" }}>
        <Loader color="blue" size="xl" mt="200px" />
      </Container>
    );
  }*/

  return (
    <Container size={largeScreen ? "xl" : "md"} className="page-content">
      <Grid mb="20px" justify="space-between" align="center">
        <Grid.Col span={5}>
          <Grid>
            <Grid.Col span={2}>
              <Card
                style={{ background: "#f9f9f9", cursor: "pointer" }}
                radius="100%"
                p="10px"
                h="50px"
                w="50px"
                onClick={() => navigate(-1)}
              >
                <IconArrowLeft size="30px" color="black" />
              </Card>
            </Grid.Col>
            <Grid.Col span="auto">
              <>
                <Title order={3} mb="2px">
                  {`${employeePayroll?.payroll?.[0].user.firstName} ${employeePayroll?.payroll?.[0].user.lastName}`}
                </Title>
                <Text color="dimmed" size="sm">
                  Payroll {payrollNo}
                </Text>
              </>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        {/* <Grid.Col span={2}>
          <Badge color="blue" variant="light" size="lg">
            Completed
          </Badge>
  </Grid.Col>*/}
      </Grid>

      <Grid>
        <Grid.Col span={4}>
          <Card radius="md" style={{ background: "#f9f9f9" }}>
            <Text color="gray.7" weight={600}>
              Paystub
            </Text>
            <Text color="dimmed" size="xs">
              Download employee paystub
            </Text>
            <Button
              radius="md"
              mt="20px"
              color="black"
              loading={isLoading}
              w="100%"
              disabled={employeePayroll?.payroll?.[0].payStub == undefined}
              h="50px"
              style={{ textAlign: "left" }}
              onClick={() => {
                dispatch(
                  getPayStubDownloadLink({
                    userId: employeeId,
                    payrollId: employeePayroll._id,
                  })
                );
              }}
            >
              {employeePayroll?.payroll?.[0].payStub && (
                <img src={pdf} width="30px" />
              )}

              <Text color="white" ml="10px">
                Download Paystub
              </Text>
              <IconArrowDown size="20px" color="white" />
            </Button>

            <Card style={{ backgroundColor: "#f1f1f1" }} radius="md" my="20px">
              <Grid>
                <Grid.Col span={12}>
                  <Text weight={600} size="sm">
                    {employeePayroll?.payroll?.[0].transactionRef?.type ||
                      "Loading..."}
                  </Text>
                  <Text color="dimmed" size="xs">
                    Transfer method
                  </Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text weight={600} size="sm">
                    $
                    {employeePayroll?.payroll?.[0].transactionRef?.amount ||
                      "Loading..."}
                  </Text>
                  <Text color="dimmed" size="xs">
                    Amount
                  </Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text
                    color={
                      etransferColor[
                        employeePayroll?.payroll?.[0].transactionRef?.status
                      ]
                    }
                    weight={600}
                    size="sm"
                  >
                    {employeePayroll?.payroll?.[0].transactionRef?.status ||
                      "Loading..."}
                  </Text>
                  <Text color="dimmed" size="xs">
                    Status
                  </Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text weight={600} size="sm">
                    {employeePayroll?.payroll?.[0].transactionRef?.security
                      .question || "Loading..."}
                  </Text>
                  <Text color="dimmed" size="xs">
                    Security Question
                  </Text>
                </Grid.Col>
              </Grid>
            </Card>
          </Card>
        </Grid.Col>
        <Grid.Col span="auto">
          <Grid>
            <Grid.Col span={6}>
              <Card radius="md" style={{ backgroundColor: "#f9f9f9" }} p="30px">
                <img src={abstract} width={40} />

                <Text weight={600} size="30px" mt="10px">
                  <Text
                    weight={600}
                    color="dimmed"
                    size="20px"
                    display="inline"
                  >
                    $
                  </Text>
                  {employeePayroll?.payroll?.[0].data.amount.toLocaleString(
                    "en-US",
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </Text>
                <Text weight={600} color="dimmed">
                  Gross Amount
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={6}>
              <Card radius="md" style={{ backgroundColor: "#f9f9f9" }} p="30px">
                <img src={abstract2} width={40} />

                <Text weight={600} size="30px" mt="10px">
                  <Text
                    weight={600}
                    color="dimmed"
                    size="20px"
                    display="inline"
                  >
                    $
                  </Text>
                  {employeePayroll?.payroll?.[0].data.netAmount.toLocaleString(
                    "en-US",
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </Text>
                <Text weight={600} color="dimmed">
                  Total Net Amount
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={6}>
              <Card radius="md" withBorder>
                <Text color="gray.7" mb="16px" weight={600}>
                  Employee Deductions
                </Text>
                <Grid>
                  <Grid.Col span={8}>
                    <Text weight={600}>CPP</Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text style={{ float: "right" }}>
                      {" "}
                      $
                      {employeePayroll?.payroll?.[0].data.employeePayrollDeductions.CPP.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={8}>
                    <Text weight={600}>EI</Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text style={{ float: "right" }}>
                      {" "}
                      $
                      {employeePayroll?.payroll?.[0].data.employeePayrollDeductions.EI.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </Text>
                  </Grid.Col>

                  <Grid.Col span={8}>
                    <Text weight={600}>Federal Tax</Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text style={{ float: "right" }}>
                      {" "}
                      $
                      {employeePayroll?.payroll?.[0].data.employeePayrollDeductions.ITDfed.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={8}>
                    <Text weight={600}>Prov Tax</Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text style={{ float: "right" }}>
                      $
                      {employeePayroll?.payroll?.[0].data.employeePayrollDeductions.ITDprov.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={8}>
                    <Text weight={600}>Extra Pay</Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text style={{ float: "right" }}>
                      $
                      {employeePayroll?.payroll?.[0].data.extraPay.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={8}>
                    <Text weight={600}>Pay Rate</Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text style={{ float: "right" }}>
                      $
                      {employeePayroll?.payroll?.[0].data.payRate.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={8}>
                    <Text weight={600}>Total Deductions</Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text style={{ float: "right" }}>
                      $
                      {employeePayroll?.payroll?.[0].data.totalDeductions.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </Text>
                  </Grid.Col>
                </Grid>
              </Card>
            </Grid.Col>
            <Grid.Col span={6}>
              <Card radius="md" withBorder>
                <Text color="gray.7" mb="16px" weight={600}>
                  Employer cost
                </Text>
                <Grid>
                  <Grid.Col span={8}>
                    <Text weight={600}>CPP</Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text style={{ float: "right" }}>
                      {" "}
                      $
                      {employeePayroll?.payroll?.[0].data.employerCosts.CPP.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={8}>
                    <Text weight={600}>EI</Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text style={{ float: "right" }}>
                      {" "}
                      $
                      {employeePayroll?.payroll?.[0].data.employerCosts.EI.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </Text>
                  </Grid.Col>

                  <Grid.Col span={8}>
                    <Text weight={600}>Employee EI returnable</Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text style={{ float: "right" }}>
                      {" "}
                      $
                      {employeePayroll?.payroll?.[0].data.employerCosts.employeeEIreturnable.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={8}>
                    <Text weight={600}>PEHT</Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text style={{ float: "right" }}>
                      {" "}
                      $
                      {employeePayroll?.payroll?.[0].data.employerCosts.PEHT.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </Text>
                  </Grid.Col>
                </Grid>
              </Card>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      {/*  <Grid mt="30px">
        <Grid.Col span={4}>
          <Grid>
            <Grid.Col span={12}>
              <Card style={{ background: "#f9f9f9" }} radius="md" p="18px">
                <IconCoins size="2rem" color="gray" />
                <Grid justify="space-between" align="center">
                  <Grid.Col span="auto">
                    <Text color="dimmed" weight={600}>
                      Total Deducations
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Text weight={500} size="lg">
                      $1200
                    </Text>
                  </Grid.Col>
                </Grid>
              </Card>
            </Grid.Col>
            <Grid.Col span={12}>
              <Card style={{ background: "#f9f9f9" }} radius="md" p="18px">
                <IconRepeat size="2rem" color="gray" />
                <Grid justify="space-between" align="center">
                  <Grid.Col span="auto">
                    <Text color="dimmed" weight={600}>
                      Pay Cycle
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Text weight={500} size="lg">
                      Weekly
                    </Text>
                  </Grid.Col>
                </Grid>
              </Card>
            </Grid.Col>
          </Grid>
        </Grid.Col>
                      </Grid> */}
    </Container>
  );
};

export default SingleEmployeePayroll;
