import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Toast,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill All Fiels",
        status: "error",
        duration: "5000",
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login Successful",
        status: "success",
        duration: "5000",
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (err) {
      console.log(err);
      toast({
        title: "Error Occured!",
        description: err.response.data.message,
        status: "error",
        duration: "5000",
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          value={password}
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 2 }}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
