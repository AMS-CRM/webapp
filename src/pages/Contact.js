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

const Contact = () => {
  return (
    <Container size="md" className="page-content">
      <Grid>
        <Grid.Col span={6}>
          <Title order={3}>Employee Information</Title>
          <Text color="dimmed" size="sm" mb="30px">
            Manage a employee.
          </Text>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={3}>
          <Card mb="20px">
            <Group spacing="sm">
              <Avatar size="lg" radius="100%" color="red">
                SS
              </Avatar>
              <div>
                <Text size="sm" weight={500}>
                  Shivdeep Singh
                </Text>
                <Text size="xs" weight={400} color="dimmed">
                  deep.shiv880@gmail.com
                </Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={9}>
          <Paper p="xl">
            <Table horizontalSpacing="sm" verticalSpacing="md">
              <thead>
                <tr>
                  <td>
                    <Title order={3} mb="10px">
                      Payroll Hirstory
                    </Title>
                  </td>
                </tr>
              </thead>

              <tbody>
                <tr p="10">
                  <td>
                    <strong>Name</strong>
                    <Text>Shivdeep Singh</Text>
                  </td>
                  <td>
                    <strong>Email</strong>
                    <Text>deep.shiv880@gmail.com</Text>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Contact;
