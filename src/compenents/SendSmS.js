import {
  Drawer,
  Title,
  Group,
  Input,
  Grid,
  form,
  Textarea,
} from "@mantine/core";
import { IconMessage2 } from "@tabler/icons";

const SendSmS = ({ opened, setOpened }) => {
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
              <Input.Wrapper
                label="Subject"
                description="Write the message subject"
                size="sm"
                required
              >
                <Input
                  placeholder="Message Subject"
                  size="md"
                  radius="md"
                  name="Subject"
                  style={{
                    border: "0px !important",
                    borderBottom: "1px solid #ced4da",
                  }}
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
