import { Title, Card, Text, Container } from "@mantine/core";

const WelcomeHeader = () => {
  return (
    <div>
      <Card style={{ background: "transparent" }}>
        <img
          width={120}
          style={{ float: "left", marginRight: "15px", marginTop: "-13px" }}
          src="https://htmlstream.com/front/assets/svg/illustrations/oc-building-apps.svg"
        />
        <Title order={2} mt="7px">
          Welcome, Shivdeeep Singh
        </Title>
        <Text color="dimmed">
          Big updates are coming your way, a powerful new builder is here! Try
          it!
        </Text>
      </Card>
    </div>
  );
};

export default WelcomeHeader;
