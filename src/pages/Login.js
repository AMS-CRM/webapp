import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";
import { useError } from "../hooks/useError.js";
import { Navigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import coin from "../assets/coin1.png";
import binary from "../assets/binary1.png";
import wallet from "../assets/wallet.png";

import {
  TextInput,
  PasswordInput,
  Anchor,
  Grid,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Card,
  Button,
} from "@mantine/core";

import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const largeScreen = useMediaQuery("(min-width: 1450px)");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { user, isLoading } = useSelector((state) => state.auth);
  const [errors, setErrors] = useError("auth");
  const { email, password } = formData;

  // On input change
  const onChange = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle the registration form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    dispatch(login(formData));
  };

  if (user && user.token != null) {
    return <Navigate to="/" />;
  }

  return (
    <div
      style={{
        background: "black",
        width: "100vw",
        height: "100vh",
        padding: 0,
        margin: 0,
      }}
    >
      <Text
        size="30px"
        weight={700}
        color="white"
        style={{
          position: "relative",
          top: "30px",
          left: "30px",
          display: "inline",
        }}
      >
        CREW
      </Text>
      <Grid
        justify="space-around"
        align="center"
        style={{
          width: "100vw",
          height: "90%",
          zIndex: "2",
        }}
      >
        <Grid.Col span={5}>
          <Text size="40px" weight={700} color="white">
            Welcome to CREW
          </Text>
          <Text size="22px" weight={500} color="white">
            Do more with Crew Autopilot with less efforts. Run your payroll with
            ease with few clicks.
          </Text>
          <Card shadow="lg" radius="xl" w="200px" mt="20px">
            <Text color="black" weight={600} align="center">
              Need help
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card withBorder shadow="lg" w="380px" radius="md" p="xl" py="40px">
            <Text size="30px" weight={600}>
              Login to CREW
            </Text>
            <Text color="dimmed" size="sm" mt={5}>
              Do not have an account yet?{" "}
              <Anchor size="sm">
                <Link to="/register">Create new account.</Link>
              </Anchor>
            </Text>
            <form onSubmit={handleSubmit}>
              <Paper mt={40} radius="md">
                <TextInput
                  label="Email"
                  placeholder="you@mantine.dev"
                  value={email}
                  name="email"
                  onChange={onChange}
                  error={errors && errors.email ? errors.email : false}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  mt="md"
                  value={password}
                  name="password"
                  error={errors && errors.password ? errors.password : false}
                  onChange={onChange}
                />

                <Button
                  type="submit"
                  fullWidth
                  mt="xl"
                  color="blue"
                  loading={isLoading}
                >
                  Sign in
                </Button>
              </Paper>
            </form>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Login;
