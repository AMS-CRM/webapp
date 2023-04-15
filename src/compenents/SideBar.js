import { useState, useEffect } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Code,
  Title,
  Text,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { IconCirclePlus, IconLogout, IconPlus } from "@tabler/icons";
import { useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const collections = [
  { emoji: "👍", label: "Whatsapp" },
  { emoji: "🚚", label: "Messages" },
  { emoji: "💸", label: "Discounts" },
];

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      zIndex: "1",
      background: "#f9fafb",
      width: "220px !important",
      minWidth: "220px !important",
      float: "left",
      position: "fixed",
      height: "100vh",
      top: "0px",
    },
    header: {
      paddingTop: theme.spacing.md * 1.5,
      paddingBottom: theme.spacing.md * 1.5,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[9],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      cursor: "pointer",
      marginBottom: "3px",
      "&:hover": {
        backgroundColor: "#f3f4f6",

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    collectionsHeader: {
      paddingLeft: theme.spacing.md + 2,
      paddingRight: theme.spacing.md,
      marginBottom: 5,
    },

    collectionLink: {
      display: "block",
      padding: `8px ${theme.spacing.xs}px`,
      textDecoration: "none",
      borderRadius: theme.radius.sm,
      fontSize: theme.fontSizes.xs,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],
      lineHeight: 1,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
    linkIcon: {
      ref: icon,
      size: "12px",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[9],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: "#e5e7eb",
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

const SideBar = ({ data, toggleOpened, toggleOpenedStatus }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");

  const collectionLinks = collections.map((collection) => (
    <a
      href="/"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      <span style={{ marginRight: 9, fontSize: 16 }}>{collection.emoji}</span>{" "}
      {collection.label}
    </a>
  ));

  const links = data.map((item) => (
    <a
      mb="20px"
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        navigate(item.link);
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} size="22" />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar className={classes.navbar} height={700} width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header}>
          <Title
            align="left"
            ml="10px"
            sx={(theme) => ({
              fontWeight: 800,
              fontSize: "20px",
              width: "100%",
            })}
          >
            Oxcean
          </Title>
        </Group>
        {links}

        {/*  <Group className={classes.collectionsHeader} position="apart" mt="20px">
          <Text size="xs" weight={500} color="dimmed">
            Collections
          </Text>
          <Tooltip label="Create collection" withArrow position="right">
            <ActionIcon variant="default" size={18}>
              <IconPlus size={12} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <div className={classes.collections}>{collectionLinks}</div>  */}
      </Navbar.Section>

      <Navbar.Section>
        <a
          className={classes.link}
          onClick={() => toggleOpened(!toggleOpenedStatus)}
        >
          <IconCirclePlus size={30} />
          <span style={{ marginLeft: "5px" }}>Create employee</span>
        </a>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a className={classes.link} onClick={() => onLogout()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
};

export default SideBar;
