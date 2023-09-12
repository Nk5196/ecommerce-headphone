import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "./Utils/SearchSlice";
import { Link, Navigate } from 'react-router-dom';
import { login, signup } from "./Utils/authenticationActions";

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
  Select,
  Text,
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
import { clearError, isSignup } from "./Utils/authenticationSlice";

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
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const [modalVisible, setModalVisible] = useState(true);
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const userdetails = useSelector((state) => state.authentication.user);
  const errmsg = useSelector((state) => state.authentication.errormsg);
  const isSignup = useSelector((state) => state.authentication.isSignup);

  console.log("userdetails", userdetails)
  console.log("isSignup--->>>", isSignup)
  console.log("err-->", errmsg)



  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)


  function handleLogin() {
    dispatch(clearError());
    onOpen()

    try {
      dispatch(clearError());
      const userData = {
        username,
        password,
      };
      console.log(userData)
      // Dispatch the login action
      dispatch(login(userData));
      
      // Check if the login was successful based on the Redux state
      // if (isAuthenticated) {
      //   console.log("successful Auth",isAuthenticated)
      //   // Redirect to the homepage using useNavigate

      //   navigate('/')
      //   onClose();

      // } 

    } catch (error) {
      // Handle errors from the login action
      console.log(error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      console.log("successful Auth", isAuthenticated)
      // Redirect to the homepage using useNavigate

      navigate('/')
      onClose();
      dispatch(clearError());


    }
  }, [isAuthenticated])


  const handleLogout = () => {
    // Dispatch the clearUserData action
    dispatch(logout());
    dispatch(clearError());

    // Optionally, you can navigate the user to a different page (e.g., the login page) after logout.
    // You may use react-router-dom's useHistory or navigate function here.
    // For example: history.push('/login');
  };


  // Create state variables for form fields
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
    gender: "",
    firstName: "",
    lastName: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the form data in the `formData` object and submit it to your backend or perform any other necessary actions.
    dispatch(signup(formData))

    if (isSignup == true) {
      dispatch(clearError());
      console.log("inside signup")
      setIsSignupModalOpen(false);


    }
    console.log(formData);
    // Add your API call or state update logic here.
  };



  const openSignupModal = () => {
    dispatch(clearError());
    onClose()
    setIsSignupModalOpen(true);
  };
  const closeSignupModal = () => {
    dispatch(clearError());
    setIsSignupModalOpen(false);
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

          <Link to="/">
            <Flex >
              <chakra.a

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
          </Link>
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
              <Link to='/cart'><Button variant="ghost">Cart</Button></Link>
              {!isAuthenticated && <Button variant="ghost" onClick={handleLogin}>Login</Button>}
              {isAuthenticated && <Button variant="ghost" onClick={handleLogout}>Logout</Button>}
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

               
                <Link to='/cart'><Button variant="ghost">Cart</Button></Link>


                {/* <Button onClick={onOpen}>Open Modal</Button> */}

                {!isAuthenticated && <Button variant="ghost" onClick={handleLogin}>Login</Button>}
              {isAuthenticated && <Button variant="ghost" onClick={handleLogout}>Logout</Button>}              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
      <Box m={2} p={2}>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={() => {
            dispatch(clearError()); // Clear error when the modal is closed
            onClose();
          }}
        >
          <ModalOverlay />
          <ModalContent mx={6}>
            <ModalHeader pb={'2px'}>Login to your account</ModalHeader>
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
              {isLargerThanMobile ?? <Flex pr={14} mt={-2} gap={2}><p >Not a member?</p><Box color={'blue.400'}><Link p={0} variant={'ghost'} onClick={openSignupModal} >Sign Up</Link></Box></Flex>
              }
              <Box pr={4}><p >Not a member?</p><Box color={'blue.400'}><Link p={0} variant={'ghost'} onClick={openSignupModal} >Sign Up</Link></Box></Box>
              <Button onClick={handleLogin} colorScheme='blue' mr={3}>
                Login
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      <Box>
        <Modal
          isOpen={isSignupModalOpen}
          onClose={closeSignupModal}
          initialFocusRef={initialRef}
        >
          <ModalOverlay />
          <ModalContent mx={6}>
            <ModalHeader>Sign Up</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {errmsg && <Text color={'red.400'} pb={1}>Error in Sign up</Text>}

              {/* Add your signup form fields here */}
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>



              {/* Add more form fields for password, name, etc. */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                Sign Up
              </Button>
              <Button onClick={closeSignupModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </Box>


    </React.Fragment>
  );
}