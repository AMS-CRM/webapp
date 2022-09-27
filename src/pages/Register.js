import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
  } from '@mantine/core';

  import { Link } from "react-router-dom";
  
const Register = () => {
    return (
        <Container size={420} my={40}>
          <Title
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          >
            Welcome to openCRM
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{' '}
            <Anchor size="sm"><Link to="/register">Already Registered?</Link></Anchor>

          </Text>
    
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Email" placeholder="you@mantine.dev" required />
            <PasswordInput label="Password" placeholder="Your password" required mt="md" />
            <Group position="apart" mt="md">
              <Checkbox label="By registering I'm accepting the T&C" />
            </Group>
            <Button fullWidth mt="xl">
              Sign in
            </Button>
          </Paper>
        </Container>
      );
}

export default Register;