import {
  Grid,
  Title,
  Card,
  Container,
  Text,
  Paper,
  Group,
  Button,
  BackgroundImage,
  Flex,
  Stack,
  Badge,
  SimpleGrid,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import fogg from "../assets/fogg-waiting-2.png";
import "../dashboard.css";
import WelcomeHeader from "../compenents/WelcomeHeader";
import CardImg from "../assets/card.png";
import nfc from "../assets/nfc.png";
import abstract from "../assets/abstract.png";
import abstract2 from "../assets/abstract2.png";
import system from "../assets/system.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboard, reset } from "../features/dashboard/dashboardSlice";

const Dashboard = () => {
  const largeScreen = useMediaQuery("(min-width: 1450px)");
  const dispatch = useDispatch();
  const {
    dashboard: data,
    isLoading,
    isSuccess,
    isError,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(dashboard());
  }, []);

  return (
    <Container size={largeScreen ? "xl" : "md"} className="page-content">
      <WelcomeHeader />
      <Grid mt="lg">
        <Grid.Col span={largeScreen ? 4 : 5}>
          <Card
            shadow="xs"
            radius="md"
            style={{
              backgroundImage: `url(${CardImg})`,
              backgroundSize: "cover",
              height: "250px",
            }}
          >
            <Grid justify="space-between" style={{ height: "100%" }}>
              <Grid.Col span={5}>
                <Stack justify="space-between" style={{ height: "100%" }}>
                  <div>
                    <Text color="#fff" weight="bold" size="36px" p="0" m="0">
                      ${data?.user?.[0].balance}
                    </Text>
                    <Text color="#fff" weight={500} p="0">
                      Current Balance
                    </Text>
                  </div>
                  <Group spacing="xs">
                    <Text
                      size="26px"
                      weight="bold"
                      color="white"
                      pr="0"
                      mt="7px"
                      mr="0"
                    >
                      CREW
                    </Text>
                    <img src={nfc} width="36px" />
                  </Group>
                </Stack>
              </Grid.Col>
              <Grid.Col span={4}>
                <Stack justify="flex-end" h="100%">
                  <Button color="blue.9" variant="white" shadow="md">
                    Add Funds
                  </Button>
                </Stack>
              </Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>
        <Grid.Col span="auto">
          <Card h="250px" style={{ background: "#f9f9f9" }} p="xl">
            <Grid>
              <Grid.Col span={8}>
                <div style={{ marginTop: "30px" }}>
                  <img src={abstract} width="40px" />
                  <Text size="30px" weight={600} mt="10px">
                    $
                    {data?.payrollsTotal?.[0]?.totalGrossAmount.toLocaleString(
                      "en-US",
                      {
                        maximumFractionDigits: 2,
                      }
                    ) || 0}
                  </Text>
                  <Text color="dimmed" weight={500} size="16px">
                    Total Gross Amount spent
                  </Text>
                </div>
              </Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>
        <Grid.Col span="auto">
          <Card h="250px" style={{ background: "#f9f9f9" }} p="xl">
            <Grid>
              <Grid.Col span={8}>
                <div style={{ marginTop: "30px" }}>
                  <img src={abstract2} width="40px" />
                  <Text size="30px" weight={600} mt="10px">
                    $
                    {data?.payrollsTotal?.[0]?.totalNetAmount.toLocaleString(
                      "en-US",
                      {
                        maximumFractionDigits: 2,
                      }
                    ) || 0}
                  </Text>
                  <Text color="dimmed" weight={500} size="16px">
                    Total Net Amount spent
                  </Text>
                </div>
              </Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>
      </Grid>
      <Paper withBorder p="lg" my="30px">
        <Title order={3}>Overview</Title>
        <Text size="sm" color="dimmed">
          Complete overview of your payrolls
        </Text>
        <Grid mt="10px" align="center">
          <Grid.Col span={3}>
            <Text size="40px" weight={500}>
              {data?.employess?.[0].noOfEmployess}
            </Text>
            <Title order={5} color="dimmed">
              Total Employess
            </Title>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text size="40px" weight={500}>
              {(data?.payrollsStatus &&
                data.payrollsStatus.filter((x) => x._id == "Pending")[0]
                  ?.count) ||
                0}
            </Text>
            <Title order={5} color="dimmed">
              Pending payrolls
            </Title>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text size="40px" weight={500}>
              {(data?.payrollsStatus &&
                data.payrollsStatus.filter((x) => x._id == "Under Review")[0]
                  ?.count) ||
                0}
            </Text>
            <Title order={5} color="dimmed">
              Pending approval
            </Title>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text size="40px" weight={500}>
              {(data?.payrollsStatus &&
                data.payrollsStatus.filter((x) => x._id == "Processing")[0]
                  ?.count) ||
                0}
            </Text>
            <Title order={5} color="dimmed">
              Currently processing
            </Title>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;
