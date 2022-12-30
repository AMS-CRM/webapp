import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Container,
  Col,
  Grid,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

export function WhatsApp({}) {
  const { classes } = useStyles();

  return (
    <Container className="page-content">
      <Grid>
        <Grid.Col span={3}>
          <UnstyledButton className={classes.user}>
            <Group>
              <Avatar radius="xl">SS</Avatar>
              <div style={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  Shivdeep Singh
                </Text>

                <Text color="dimmed" size="xs">
                  deep.shiv880@gmail.com
                </Text>
              </div>

              <IconChevronRight size={14} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default WhatsApp;
