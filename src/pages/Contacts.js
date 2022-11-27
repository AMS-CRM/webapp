import { useEffect, useState, useMemo } from "react";
import { getContacts } from "../features/contacts/contactSlice";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams }  from "react-router-dom";
import getInitials  from "../utils/getInitials";
import {hash} from "../utils/hash"

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
    Pagination,
    Card,
    Container,
    Input,
    createStyles,
    Grid,
    Select
  } from '@mantine/core';
import { IconPencil, IconTrash, IconSearch } from '@tabler/icons';


const useStyles = createStyles((theme) => ({
  thead: {
    background: "#F9F9F9"
  },
  searchGrid: {
    marginTop: "8px",
    justifyContent: "right"
  },

}))

const jobColors = {
    engineer: 'blue',
    manager: 'cyan',
    designer: 'pink',
  };

const colors = ['neutral', 'blue', 'red', 'orange', 'yellow', 'green', 'teal', 'purple']


const Contacts = () => {

    const dispatch = useDispatch()
    const { page } = useParams();
    const navigate = useNavigate();
    const { classes, cx } = useStyles();
    const { contacts: {data} } = useSelector(state => state.contacts)
    const [ pages, setPages ] = useState(0)
    const [ activePage, setActivePage] = useState(parseInt(page) || 1)
    const [ searchQuery, setSearchQuery ] = useState({keyword: "", search: "email"})
    const { keyword, search } = searchQuery;

    useMemo(() => {
        dispatch(getContacts({page}));
    }, [])

    useEffect(() => {
     if (data && data.count) {
      setPages(Math.ceil(data.count/10))
     }
    }, [data])

    const setPage = (page) => {

      dispatch(getContacts({page}));
      navigate(`/contacts/${page}`)
      setActivePage(page)
      
    }

    const onChange = (e) => {

      setSearchQuery((state) => ({
        ...state,
        [e.target.name]: e.target.value,
      }))

      dispatch(getContacts({ page: 0, search, keyword: e.target.value}));


    }

    const searchBy = (search) => {
      setSearchQuery((state) => ({
          ...state,
          search
      }))
      
      dispatch(getContacts({ page: 0, search, keyword}));
     
    }
    
    const theme = useMantineTheme();
    const rows = data && data.contacts.length > 0 && data.contacts.map((item) => (
        <tr key={item._id}>
          <td>
            <Group spacing="sm">
            <Avatar color={colors[hash(item.name, colors.length-1)]} radius="xl">{getInitials(item.name)}</Avatar>
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
            <Anchor size="sm" href="#" >
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
       <Container size="xl" mb="100px">
          
          <Grid>
              <Grid.Col span={6}>
                <Title order={3}>Applications</Title>
              <Text color="dimmed" size="sm" mb="30px">Create and manage the applications.
            </Text>
                 
            </Grid.Col>     

            <Grid.Col span={6}   >
              <Grid className={classes.searchGrid}>
                <Grid.Col span={5}>
                <Input
                  icon={<IconSearch />}
                  value={searchQuery.keyword}
                  name="keyword"
                  placeholder="Search keyword"
                  onChange={e => onChange(e)}

                />  
                </Grid.Col>
                <Grid.Col span={3}>
                <Select 
                    placeholder="Search by"
                    name="search"
                    value={searchQuery.search}
                    data={[
                      { value: 'email', label: 'Email Address' },
                      { value: 'name', label: 'Student Name' },
                      { value: 'studentId', label: 'Student ID' },
                      { value: 'passport', label: 'Passport Number' },
                    ]}
                    onChange={val => searchBy(val)}
                 />
                </Grid.Col>
              </Grid>
            </Grid.Col>     
          </Grid>
          
         
          <Card  shadow="sm" p="0" radius="md" mb="30px" >
           <ScrollArea>
            <Table sx={{ minWidth: 800 }} verticalSpacing="sm" >
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

          <Pagination 
            total={pages} 
            page={activePage}
            onChange={page => setPage(page)}
          />
        </Container>
    )
}

export default Contacts;