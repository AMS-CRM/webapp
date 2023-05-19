import { Title, Card, Text, Container } from "@mantine/core";
import { useSelector } from "react-redux";

const WelcomeHeader = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <Card style={{ background: "transparent" }}>
        <img
          width={120}
          style={{ float: "left", marginRight: "15px", marginTop: "-13px" }}
          src="https://htmlstream.com/front/assets/svg/illustrations/oc-building-apps.svg"
        />
        <Title order={2} mt="7px">
          Welcome, {user?.name}
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
