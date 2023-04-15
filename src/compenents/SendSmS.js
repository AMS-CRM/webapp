import {
  Drawer,
  Title,
  Group,
  Input,
  Grid,
  form,
  Textarea,
  createStyles,
} from "@mantine/core";
import { IconMessage2 } from "@tabler/icons";

const useStyles = createStyles({
  inputBottom: {
    border: "0px !important",
    borderBottom: "1px solid #ccc",
  },
});

const SendSmS = ({ opened, setOpened }) => {
  const { classes } = useStyles();

  return (
    <>
      <Drawer
        opened={opened}
        position="right"
        padding="xl"
        size="xl"
        onClose={() => {
          setOpened(false);
        }}
      >
        <Group mb="20px">
          <IconMessage2 size="40" color="#298eea" />
          <Title order={3}>Send Message</Title>
        </Group>
        <form>
          <Grid>
            <Grid.Col span={12}>
              <Input.Wrapper label="Subject" size="sm" required>
                <Input
                  className={classes.inputBottom}
                  placeholder="Message Subject"
                  size="md"
                  radius="md"
                  name="Subject"
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={12}>
              <Input.Wrapper
                label="Subject"
                description="Write the message subject"
                size="sm"
                required
              ></Input.Wrapper>
            </Grid.Col>
          </Grid>
        </form>
      </Drawer>
    </>
  );
};

export default SendSmS;
