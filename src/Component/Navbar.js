import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchText } from "./Utils/SearchSlice";
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


export default function App() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const [isLargerThanMobile] = useMediaQuery("(min-width: 480px)");
  const [text, setText] = useState("")
  const dispatch = useDispatch();
 console.log("search",text)
 
    // Dispatch the action with the current searchText value
    dispatch(setSearchText(text));


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
              <Button variant="ghost">Company</Button>
              <Button variant="ghost">Sign in</Button>
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

                <Button w="full" variant="ghost">
                  Company
                </Button>
                <Button w="full" variant="ghost">
                  Sign in
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}


