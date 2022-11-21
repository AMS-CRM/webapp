import { useEffect, useState } from "react";
import { getContacts } from "../features/contacts/contactSlice";
import { useDispatch, useSelector } from "react-redux"
import { IconClipboardText } from '@tabler/icons';

import {
    Avatar,
    Badge,
    Table,
    Group,
    Text,
    ActionIcon,
    Anchor,
    ScrollArea,
    useMantineTheme,
    Title,
    Center,
    Card,
    Container,
    createStyles
  } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons';


const useStyles = createStyles((theme) => ({
  thead: {
    background: "#F9F9F9"
  }
}))

const jobColors = {
    engineer: 'blue',
    manager: 'cyan',
    designer: 'pink',
  };

const Contacts = () => {

    const dispatch = useDispatch()
    const { classes, cx } = useStyles();
    const data = useSelector(state => state.contacts)
    const [ contacts, setContacts ] = useState([]);

    useEffect(() => {
        dispatch(getContacts());
    }, [])

    useEffect(() => {

     if (data.length != 0) {
      setContacts(data.contacts)
     }

    }, [data])
    

    const theme = useMantineTheme();
    const rows = contacts.length != 0 && contacts.data.map((item) => (
        <tr key={item.name}>
          <td>
            <Group spacing="sm">
            <Avatar color="cyan" radius="xl">{item.name.substr(0, 2).toUpperCase()}</Avatar>
              <Text size="sm" weight={500}>
                {item.name}
              </Text>
            </Group>
          </td>
    
          <td>
            <Badge
              color={jobColors["engineer".toLowerCase()]}
              variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
            >
              hello
            </Badge>
          </td>
          <td>
            <Anchor size="sm" href="#" onClick={(event) => event.preventDefault()}>
              {item.email}
            </Anchor>
          </td>
          <td>
            <Text size="sm" color="dimmed">
              {item.email}
            </Text>
          </td>
          <td>
            <Group spacing={0} position="right">
              <ActionIcon>
                <IconPencil size={16} stroke={1.5} />
              </ActionIcon>
              <ActionIcon color="red">
                <IconTrash size={16} stroke={1.5} />
              </ActionIcon>
            </Group>
          </td>
        </tr>
      ));
    
    return (
        <Container size="lg">
          <Title order={3}>Applications</Title>
          <Text color="dimmed" size="sm" mb="30px">Create and manage the applications.
          </Text>

          <Card  shadow="sm" p="0" radius="md" >
           <ScrollArea>
            <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
              <thead className={classes.thead}>
                <tr>
                  <th>Employee</th>
                  <th>Job title</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th />
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </ScrollArea>
          </Card>

          
        </Container>
    )
}

export default Contacts;