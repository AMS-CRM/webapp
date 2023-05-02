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
} from "@mantine/core";
import fogg from "../assets/fogg-waiting-2.png";
import "../dashboard.css";
import WelcomeHeader from "../compenents/WelcomeHeader";
import CardImg from "../assets/card.png";
import nfc from "../assets/nfc.png";
import abstract from "../assets/abstract.png";
import check from "../assets/completed.png";

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
          <Card radius="sm" h="250px" withBorder p="lg">
            <Grid align="center" justify="center">
              <Grid.Col span={12}>
                <Text mt="10px" weight={600} color="gray.7" lin>
                  PAYROLL STATUS
                </Text>
                <Card style={{ background: "#f9f9f9" }} mt="20px">
                  <Group>
                    <img src={check} width={40} />

                    <Text weight={400}>
                      All payroll are completed as per schedule
                    </Text>
                  </Group>
                </Card>
              </Grid.Col>
            </Grid>
            <Button
              variant="light"
              color="blue"
              mt="20px"
              style={{ float: "right" }}
            >
              View All
            </Button>
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
              Total Applications
            </Title>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text size="40px" weight={500}>
              2
            </Text>
            <Title order={5} color="dimmed">
              Under Review
            </Title>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text size="40px" weight={500}>
              1
            </Text>
            <Title order={5} color="dimmed">
              Total Rejected
            </Title>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text size="40px" weight={500}>
              0
            </Text>
            <Title order={5} color="dimmed">
              Pending Review
            </Title>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;
