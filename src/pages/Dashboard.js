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
} from "@mantine/core";
import fogg from "../assets/fogg-waiting-2.png";
import "../dashboard.css";
import WelcomeHeader from "../compenents/WelcomeHeader";
import CardBg from "../assets/card.png";

const Dashboard = () => {
  return (
    <Container size="lg" className="page-content">
      <WelcomeHeader />
      <Grid mt="lg">
        <Grid.Col span={4}>
          <Card shadow="xs" withBorder radius="md" backgroundColor="red">
            <Grid>
              <Grid.Col>
                <Text weight={500} size="24px">
                  $1200
                </Text>
                <Text color="dimmd"> Current Balance</Text>
              </Grid.Col>
              <Grid.Col>
                <Button variant="light" color="blue.9">
                  Fund Account
                </Button>
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
