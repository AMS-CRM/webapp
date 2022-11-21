import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux"
import { logout, reset} from "../features/auth/authSlice"
import { useNavigate, useLocation } from 'react-router-dom';

import { createStyles, Header, Group, ActionIcon, Container, Burger, Button, Menu, Text, Avatar, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import {
  IconLogout,
  IconChevronDown
} from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  header: {
    boxShadow: "rgb(0 12 43 / 5%) 0px 4px 8px"
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'left',
    height: 56,
    maxWidth: "none",

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  button: {
    borderRadius: "8px",

  },

  links: {
    cursor: "pointer",
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    width: 260,
    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'flex',
    padding: '8px 8px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
  linkIcon: {
    width: "20px",
    marginRight: "8px"
  }

}));

const HeaderTabs = ({links, toggleOpened, toggleOpenedStatus}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const location = useLocation();
  const currentPage = location.pathname.split("/")[1];
  const [userMenuOpened, setUserMenuOpened] = useState(false);


  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx, theme } = useStyles();
  
  const onTabChange = (tab) => {
    setActive(tab);
    navigate(tab)
  }

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login")
  }

  const items = links.map((link) => (
    <a
      key={link.label}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault();
        onTabChange(link.link)
      }}
    >

      <img src={link.icon} className={classes.linkIcon} /> 
      <span>{link.label}</span>
    </a>
  ));



  return (
      <Header height={56} mb={50} className={classes.header}>
      <Container className={classes.inner} size="xl">
        <Burger opened={opened} onClick={toggle} size="sm" className={classes.burger} />
        <Group className={classes.links} >
          {items}
          <Button 
            className={classes.button}
            onClick={() => toggleOpened(!toggleOpenedStatus)}
          >New application</Button>
        </Group>

        <Group position="apart">

          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

          <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group spacing={7}>
                  <Avatar radius="xl" size={20} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    Shivdeep Singh
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
            
             
              <Menu.Item color="red" icon={<IconLogout size={14} stroke={1.5} />} onClick={onLogout}>
               Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

      </Container>
    </Header>

);
}

export default HeaderTabs;