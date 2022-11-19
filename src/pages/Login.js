import { useState  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useError } from "../hooks/useError.js"
import { Navigate } from "react-router-dom";
import { login  } from "../features/auth/authSlice";

import {
   TextInput,
   PasswordInput,
   Anchor,
   Paper,
   Title,
   Text,
   Container,
   Group,
   Button,
 } from '@mantine/core';

 import { Link } from "react-router-dom";
 
const Login = () => {
  
   const dispatch = useDispatch();
   const [formData, setFormData] = useState({email: '', password: ''});
   const { user } = useSelector(state => state.auth)
   const [errors, setErrors] = useError("auth")
   const { email, password } = formData;

   // On input change
   const onChange = (e) => {
     setFormData((state) => ({
       ...state,
       [e.target.name]: e.target.value
     }))

   }

   // Handle the registration form submission
   const handleSubmit = (e) => {
     e.preventDefault();

     setErrors({})
     dispatch(login(formData))

   }

   if ( user && user.token != null ) {
     return <Navigate to="/" />;
   }


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
           <Anchor size="sm"><Link to="/register">Create new account.</Link></Anchor>

         </Text>
     <form onSubmit={handleSubmit}>
         <Paper withBorder shadow="md" p={30} mt={30} radius="md" >

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
          
           <Button type="submit" fullWidth mt="xl">
             Sign in
           </Button>

         </Paper>
         </form>
       </Container>
     );
}

export default Login;