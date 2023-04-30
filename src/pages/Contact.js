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
  Badge,
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
        <Grid align="center">
          <Grid.Col span={12}>
            <Group>
              <Avatar size="lg" radius="100%" color="red">
                SS
              </Avatar>
              <div>
                <Title>{`${contact.firstName} ${contact.lastName}`}</Title>
                <Text color="dimmed" size="sm" mb="30px">
                  {contact.email}
                </Text>
              </div>
              <Badge color="green" variant="light">
                Active
              </Badge>
            </Group>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={5}>
            <Card shadow="sm" radius="md" withBorder>
              <Text my="10px" weight={400}>
                Total Earnings
              </Text>
              <Text weight={600} size="36px">
                $1200
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={7}>
            <Card shadow="sm" radius="md" withBorder>
              <Text my="10px" weight={400}>
                Payroll History
              </Text>
              <Card style={{ background: "#f1f1f1" }} radius="md">
                <Grid>
                  <Grid.Col span={12}>
                    <Grid.Col span={4}>
                      <Text weight="500">For September, 2023</Text>
                      <Text color="dimmed" size="sm">
                        Weekly Regular
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Text align="right">$1300</Text>
                    </Grid.Col>
                  </Grid.Col>
                </Grid>
              </Card>
              <Card style={{ background: "#f1f1f1" }} radius="md" mt="10px">
                <Grid>
                  <Grid.Col span={12}>
                    <Grid.Col span={4}>
                      <Text weight="500">For September, 2023</Text>
                      <Text color="dimmed" size="sm">
                        Weekly Regular
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Text align="right">$1300</Text>
                    </Grid.Col>
                  </Grid.Col>
                </Grid>
              </Card>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    )
  );
};

export default Contact;
