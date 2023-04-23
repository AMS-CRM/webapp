import { useRef } from "react";
import {
  Avatar,
  Badge,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Title,
  Pagination,
  Card,
  PasswordInput,
  Container,
  Table,
  Button,
  Modal,
  createStyles,
  Grid,
  Input,
  Select,
  Checkbox,
  Menu,
} from "@mantine/core";
import {
  IconSearch,
  IconClipboardList,
  IconDeviceFloppy,
  IconCircleX,
} from "@tabler/icons";
import { editContact } from "../features/contacts/contactSlice";
import { hash } from "../utils/hash";
import getInitials from "../utils/getInitials";
const colors = ["blue", "red", "orange", "yellow", "green", "teal", "purple"];

const TableRow = ({ item, handleCheckedItems, itemCheckedStatus }) => {
  const input = useRef({});

  const onInputChange = () => {};

  return (
    <tr key={item._id}>
      <td>
        <Group spacing="sm">
          <Checkbox
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              handleCheckedItems(item._id);
            }}
            mt="6px"
            checked={itemCheckedStatus(item._id)}
          />
          <Avatar
            color={colors[hash(item.firstName)]}
            radius="xl"
            variant="filled"
            size="md"
          >
            {getInitials(`${item.firstName} ${item.lastName}`)}
          </Avatar>
          <div>
            <Text size="sm" weight={400}>
              {`${item.firstName} ${item.lastName}`}
            </Text>
            {/*
                <Text size="xs" weight={400} color="dimmed">
                  {item.email}
                </Text>
            */}
          </div>
        </Group>
      </td>

      <td>{item.passport}</td>
      <td>
        <Anchor size="sm" href="#">
          {item.email}
        </Anchor>
      </td>

      <td>
        <Input.Wrapper
          style={{ width: "120px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <Input
            placeholder="Security Questions"
            name="securityQuestion"
            size="sm"
            radius="md"
            ref={(el) => (input.current[item._id] = el)}
            defaultValue={item.payroll.securityQuestion}
            onChange={(e) => onInputChange(e, item._id)}
          />
        </Input.Wrapper>
      </td>
      <td>
        <Input.Wrapper
          style={{ width: "100px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <PasswordInput
            placeholder="Last Name"
            name="securityAnswer"
            size="sm"
            radius="sm"
            onChange={(e) => onInputChange(e, item._id)}
          />
        </Input.Wrapper>
      </td>
      <td>
        <Input.Wrapper
          style={{ width: "100px" }}
          onClick={(e) => e.stopPropagation(e, item._id)}
        >
          <Input
            placeholder="amount"
            name="amount"
            size="sm"
            radius="sm"
            onChange={(e) => onInputChange(e, item._id)}
          />
        </Input.Wrapper>
      </td>
    </tr>
  );
};

export default TableRow;
