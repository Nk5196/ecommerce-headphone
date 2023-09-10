import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "./Utils/SearchSlice";
import { Link, Navigate } from 'react-router-dom';
import { login } from "./Utils/authenticationActions";

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Img,
  Input,
  useMediaQuery,
  Spacer,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  Modal, FormLabel, FormControl,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { logout } from "./Utils/authenticationSlice";

export default function App() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const [isLargerThanMobile] = useMediaQuery("(min-width: 480px)");
  const [text, setText] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();


  console.log("search", text)

  // Dispatch the action with the current searchText value
  dispatch(setSearchText(text));

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [modalVisible, setModalVisible] = useState(true);
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const userdetails = useSelector((state) => state.authentication.user);
  console.log("userdetails",isAuthenticated)


  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)


  function handleLogin() {

    try {
      const userData = {
        username,
        password,
      };
      console.log(userData)
      // Dispatch the login action
      dispatch(login(userData));

      // Check if the login was successful based on the Redux state

      if (isAuthenticated) {
        console.log("successful Auth")
          // Redirect to the homepage using useNavigate
          onClose();
          navigate('/')
          onClose();
        } else {
        // Handle login failure
      }
    } catch (error) {
      // Handle errors from the login action
      console.log(error)
    }
  }

  
    const handleLogout = () => {
      // Dispatch the clearUserData action
      dispatch(logout());
      
      // Optionally, you can navigate the user to a different page (e.g., the login page) after logout.
      // You may use react-router-dom's useHistory or navigate function here.
      // For example: history.push('/login');
    };
  
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
        position={'sticky'}
        top={'0'}
        zIndex={500}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <Img w={10} src='https://res.cloudinary.com/dq4tpe282/image/upload/v1694152421/headphone%20ecom/letter-n-_rkxmzs.jpg' />
            </chakra.a>
            {isLargerThanMobile && <chakra.h1 fontSize="xl" fontWeight="medium" mt={1} ml="0">
              -Tune
            </chakra.h1>}
          </Flex>
          <Spacer />
          <Input
            borderColor={"green.600"}
            w={["78", "78", "78", "96"]}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Spacer />
          <HStack display="flex" alignItems="end" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Pricing</Button>
              {!isAuthenticated&&<Button variant="ghost" onClick={onOpen}>Login</Button>}
              {isAuthenticated&&<Button variant="ghost" onClick={handleLogout}>Logout</Button>}
            </HStack>

            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button w="full" variant="ghost">
                  Features
                </Button>
                <Button w="full" variant="ghost">
                  Pricing
                </Button>

                {/* <Button onClick={onOpen}>Open Modal</Button> */}

                <Button variant={'ghost'} onClick={onOpen}>Login</Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
      <Box m={2} p={2}>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent mx={6}>
            <ModalHeader>Login to your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>User name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="User name"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={handleLogin} colorScheme='blue' mr={3}>
                Login
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
            <Flex p={6} pt={2} gap={2}><p >Not a member?</p><Link p={0} variant={'ghost'}>Sign Up</Link></Flex>
          </ModalContent>
        </Modal>
      </Box>
    </React.Fragment>
  );
}


