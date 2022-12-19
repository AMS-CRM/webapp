import { useEffect, useState, useMemo } from "react";
import { getContacts, deleteContact, reset } from "../features/contacts/contactSlice";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams }  from "react-router-dom";
import getInitials  from "../utils/getInitials";
import {hash} from "../utils/hash"
import  TableLoader  from "../compenents/TableLoader"
import { useError } from "../hooks/useError"
import moment from "moment";
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
    Container,
    Table,
    Button,
    Modal,
    Input,
    createStyles,
    Grid,
    Select
  } from '@mantine/core';
import { IconPencil, IconTrash, IconSearch, IconClipboardList, IconAlertCircle } from '@tabler/icons';
import Empty from "../layout/Empty.js";


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
    const { contacts: {data}, isLoading, isError, isSuccess } = useSelector(state => state.contacts)
    const [ pages, setPages ] = useState(0)
    const [ activePage, setActivePage] = useState(parseInt(page) || 1)
    const [ searchQuery, setSearchQuery ] = useState({keyword: "", search: "email"})
    const { keyword, search } = searchQuery;
    const [ opened, setOpened ] = useState(false)
    const [ seletedItem, setSelectedItem] = useState(false);

    useMemo(() => {
        dispatch(getContacts({page}));
    }, [])
  
    useEffect(() => {

    if (data && data.count) {
      setPages(Math.ceil(data.count/10))
     }

     if ( isSuccess && seletedItem ) {
      dispatch(getContacts({page}));
      setSelectedItem(false);
      setOpened(false)
     }

     return (() => dispatch(reset()))

    }, [data, isSuccess, dispatch])

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

    const deleteContactModal = (id) => {

      setSelectedItem(id);
      setOpened(true);

    }

    const onDelete = () => {
      dispatch(deleteContact({_id: seletedItem}))
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
            <Group spacing="sm" >
            <Avatar color={colors[hash(item.firstName, colors.length-1)]} radius="xl">{getInitials(`${item.firstName} ${item.lastName}`)}</Avatar>
              <div>
              <Text size="sm" weight={500} >
                {`${item.firstName} ${item.lastName}`}
              </Text>
              <Text size="xs" weight={400} color="dimmed" >
                {item.email}
              </Text>
              </div>
            </Group>
          </td>
    
          <td>
            <Badge
              color={jobColors["engineer".toLowerCase()]}
              variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
            >
              {item.passport}
            </Badge>
          </td>
          <td>
            <Anchor size="sm" href="#" >
              {item.email}
            </Anchor>
          </td>
          <td>
            <Text size="sm" color="dimmed">
              {`${item.phone.number}`}
            </Text>
          </td>
           <td>
            <Text size="sm" color="dimmed">
             {item.nationality}
            </Text>
          </td>
          <td>
            <Text size="sm" color="dimmed">
              {moment(item.dob).format("MMM Do YY")}
            </Text>
          </td>
          <td>
            <Group spacing={0} position="right">
              <ActionIcon>
                <IconPencil size={16} stroke={1.5} />
              </ActionIcon>
                <ActionIcon color="red"  onClick={() => deleteContactModal(item._id)}>
                  <IconTrash size={16} stroke={1.5} />
                </ActionIcon>
            </Group>
          </td>
        </tr>
      ));
    
    return (
       <Container size="xl" mb="100px">
           <Modal opened={opened} size="lg" p="10px" withCloseButton={false} onClose={() => setOpened(false)} centered  overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3} >
              <Avatar color="red" radius="100%" style={{float: "left", marginRight: "10px"}}><IconAlertCircle /></Avatar>
               <Group mb="10px">
                  <Title order={2}>Delete contact</Title>
                  <Text size="sm" color="dimmed" >Are you sure you want to delete this event type? Anyone who you've shared this link with will no longer be able to book using it.</Text>
               </Group>
                <Group position="right">
                  <Anchor><Text size="sm" onClick={() => setOpened(false)}>Cancel</Text></Anchor>
                  <Button onClick={() => onDelete()} loading={isLoading}>Delete</Button>
                </Group>
           </Modal>
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
        
         
          {
            (isError && !data) ? 
              <Empty 
                  title="Create manage and delete contacts"
                  description="Creating availability schedules allows you to manage availability across event types. They can be applied to one or more event types.              "
                  icon={<IconClipboardList size="40"/>}
              /> 
            : (!isLoading) ?  <>
            <Card  shadow="sm" p="0" radius="md" mb="30px" >
            <ScrollArea>
           
              <Table sx={{ minWidth: 800 }} verticalSpacing="sm" >
               <thead className={classes.thead}>
                 <tr>
                   <th>Student Name</th>
                   <th>Passport Number</th>
                   <th>Email</th>
                   <th>Phone</th>
                   <th>Country</th>
                   <th>Date of birth</th>
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
         /></> :  <TableLoader /> 
            
          } 
        
      
         
         
        </Container>
    )
}

export default Contacts;