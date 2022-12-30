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
import { useSelector } from "react-redux";

const Contact = () => {
  return (
    <Container size="md" className="page-content">
      <Grid>
        <Grid.Col span={3}>
          <Card mb="20px" radius="lg">
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
          <Card style={{ background: "#f7f7f7" }} radius="md" p="sm">
            <Group spacing="sm">
              <IconClock color="grey" />
              <div>
                <Text size="sm" weight={500}>
                  Applicant's Profile
                </Text>
                <Text size="xs" weight={400} color="dimmed">
                  Basic information
                </Text>
              </div>
              <Text
                style={{ float: "right", position: "absolute", right: "20px" }}
                color="grey"
              >
                >
              </Text>
            </Group>
          </Card>
          <Card radius="md" mt="5px" p="sm">
            <Group spacing="sm">
              <IconClipboard color="grey" />
              <div>
                <Text size="sm" weight={500}>
                  Academics
                </Text>
                <Text size="xs" weight={400} color="dimmed">
                  Study history
                </Text>
              </div>
            </Group>
          </Card>
          <Card radius="md" mt="5px" p="sm">
            <Group spacing="sm">
              <IconTimeline color="grey" />
              <div>
                <Text size="sm" weight={500}>
                  Timeline
                </Text>
                <Text size="xs" weight={400} color="dimmed">
                  Applicant's logs
                </Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={9}>
          <Paper withBorder radius="md" p="xl">
            <Table horizontalSpacing="sm" verticalSpacing="md">
              <thead>
                <tr>
                  <td>
                    <Title order={3} mb="10px">
                      Applicant's Information
                    </Title>
                    <Button variant="outline" radius="xl" mr="5px">
                      Edit
                    </Button>
                    <Button variant="outline" radius="xl" mr="5px">
                      Download Profile
                    </Button>
                    <Button variant="outline" radius="xl">
                      More <IconChevronDown size="14" />
                    </Button>
                  </td>
                </tr>
              </thead>
              .{" "}
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
                <tr p="10">
                  <td>
                    <strong>Phone</strong>
                    <Text>+91 98153949393</Text>
                  </td>
                  <td>
                    <strong>Passport no.</strong>
                    <Text>N348348</Text>
                  </td>
                </tr>
                <tr p="10">
                  <td>
                    <strong>Phone</strong>
                    <Text>+91 98153949393</Text>
                  </td>
                  <td>
                    <strong>Passport no.</strong>
                    <Text>N348348</Text>
                  </td>
                </tr>
                <tr p="10">
                  <td>
                    <strong>Phone</strong>
                    <Text>+91 98153949393</Text>
                  </td>
                  <td>
                    <strong>Passport no.</strong>
                    <Text>N348348</Text>
                  </td>
                </tr>
                <tr p="10">
                  <td>
                    <strong>Phone</strong>
                    <Text>+91 98153949393</Text>
                  </td>
                  <td>
                    <strong>Passport no.</strong>
                    <Text>N348348</Text>
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
