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
import fogg from "../assets/fogg-waiting-2.png";
import "../dashboard.css";
import WelcomeHeader from "../compenents/WelcomeHeader";
import CardImg from "../assets/card.png";
import nfc from "../assets/nfc.png";
import abstract from "../assets/abstract.png";
import system from "../assets/system.png";

const Dashboard = () => {
  return (
    <Container size="lg" className="page-content">
      <WelcomeHeader />
      <Grid mt="lg">
        <Grid.Col span={5}>
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
                      $1200
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
        <Grid.Col span={7}>
          <Card h="250px" withBorder>
            <Grid>
              <Grid.Col span={8}>
                <div style={{ marginTop: "40px" }}>
                  <img src={abstract} width="40px" />
                  <Text color="gray.7" weight={500} size="18px" my="10px">
                    To run a bulk payroll click the button below and create a
                    new batch
                  </Text>
                  <Button color="black" variant="outline">
                    Run payroll
                  </Button>
                </div>
              </Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>
      </Grid>
      <Paper withBorder p="lg" mt="30px">
        <Title order={3}>Totals</Title>
        <Text size="sm" color="dimmed">
          Complete overview of your appilcation portal
        </Text>
        <Grid mt="10px" align="center">
          <Grid.Col span={3}>
            <Text size="40px" weight={500}>
              5
            </Text>
            <Title order={5} color="dimmed">
              Total Employess
            </Title>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text size="40px" weight={500}>
              2
            </Text>
            <Title order={5} color="dimmed">
              Total payrolls
            </Title>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text size="40px" weight={500}>
              1
            </Text>
            <Title order={5} color="dimmed">
              Pending approval
            </Title>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text size="40px" weight={500}>
              0
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
