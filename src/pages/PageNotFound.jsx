import { Container, Grid, Text, Title } from "@mantine/core";
import empty from "../assets/empty.png";

const PageNotFound = () => {
  return (
    <Container mt="100px" className="page-content">
      <Grid justify="center" align="center">
        <Grid.Col span={8} align="center">
          <img src={empty} />
          <Text size="40px" color="gray.7" mb="10px" weight={600}>
            Page not found
          </Text>
          <Text size="20px">
            The page you are looking for is not found. Perhaps try to navigate
            to other pages in the sidebar.
          </Text>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
export default PageNotFound;
