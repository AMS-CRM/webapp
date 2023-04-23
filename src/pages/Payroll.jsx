import { useEffect, useState, useMemo } from "react";
import { payrollList, reset } from "../features/payrolls/payrollSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { hash } from "../utils/hash";
import TableLoader from "../compenents/TableLoader";
import { useError } from "../hooks/useError";
import SendSmS from "../compenents/SendSmS";
import {
  Group,
  Text,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Title,
  Loader,
  Card,
  Container,
  Table,
  createStyles,
  Grid,
} from "@mantine/core";
import {
  IconChevronRight,
  IconSearch,
  IconClipboardList,
  IconAlertCircle,
} from "@tabler/icons";
import Empty from "../layout/Empty.js";

const useStyles = createStyles((theme) => ({
  thead: {
    background: "#F9F9F9",
  },
  searchGrid: {
    marginTop: "8px",
    justifyContent: "right",
  },
  tbody: {
    marginBottom: "10px",
  },
}));

const colors = {
  Pending: "yellow",
  Completed: "green",
  Processing: "black",
};

const Payroll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes, cx } = useStyles();
  const {
    isLoading,
    isSuccess,
    isError,
    message,
    list: data,
  } = useSelector((state) => state.payroll);
  const [sendSmSOpened, setSendSmS] = useState(false);

  useEffect(() => {
    dispatch(payrollList());

    return () => dispatch(reset());
  }, [dispatch]);

  const theme = useMantineTheme();
  const rows =
    data &&
    data.length > 0 &&
    data.map((item) => (
      <tr key={item._id} className={classes.tbody}>
        <td p="20">
          <Group spacing="sm">
            <div>
              <Text size="sm" weight={500}>
                {`Payroll ${item.payrollNo}`}
              </Text>
              <Text size="sm" weight={300}>
                Regular
              </Text>
            </div>
          </Group>
        </td>

        <td>
          <div>
            <Text size="sm" weight={500}>
              Regular Payroll
            </Text>
            <Text size="sm" weight={300}>
              Bi-weekly
            </Text>
          </div>
        </td>
        <td>
          <Anchor size="sm" href="#">
            12th Feb - 20th feburary
          </Anchor>
        </td>
        <td>
          <Group color={colors[item.status]}>
            <Text
              size="sm"
              weight="500"
              color={colors[item.status]}
              align="center"
            >
              {item.status}
            </Text>
            <Loader size="20" />
          </Group>
        </td>

        <td>
          <IconChevronRight size="20" color="gray" />
        </td>
      </tr>
    ));

  return (
    <Container justify="space-between" mb="100px" className="page-content">
      <Grid>
        <Grid.Col span={6}>
          <Title order={3}>Payrolls</Title>
          <Text color="dimmed" size="sm" mb="30px">
            Check your payrolls history
          </Text>
        </Grid.Col>
      </Grid>
      {isError && !data ? (
        <Empty
          title="Create manage and delete contacts"
          description="Creating availability schedules allows you to manage availability across event types. They can be applied to one or more event types.              "
          icon={<IconClipboardList size="40" />}
        />
      ) : !isLoading ? (
        <>
          <Card p="0" radius="md" mb="30px">
            <ScrollArea>
              <Table
                sx={{ minWidth: 800 }}
                verticalSpacing="xl"
                horizontalSpacing="xl"
              >
                <tbody>{rows}</tbody>
              </Table>
            </ScrollArea>
          </Card>
        </>
      ) : (
        <TableLoader />
      )}
    </Container>
  );
};

export default Payroll;
