import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Button,
    Card,
    CardBody,
    CardFooter,
    Image,
    Stack,
    Text,
    Divider,
    ButtonGroup,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
} from '@chakra-ui/react';
import styled from 'styled-components';

import { Box, Flex, Grid, Heading, Spacer } from '@chakra-ui/react';


import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const CartPage = () => {

    const [cartData, setCartData] = useState([]);

    const userdetails = useSelector((state) => state.authentication.user);
    console.log("userdetails", userdetails)
    const userId = userdetails?.userId

    const TruncatedHeading = styled.h1`
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
font-weight: 600;
`;

    const TruncatedHeading1 = styled.h1`
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
`;
    const fetchCartData = (userId) => {
        return axios.get(`https://dnyanodaya-backend-1.vercel.app/api/cart/get-cart/${userId}`); // Replace with your API endpoint
    };

    useEffect(() => {
        // Fetch cart data when the component mounts or when the user ID changes
        fetchCartData(userId)
            .then((response) => {
                console.log("data1--->>>", response?.data)
                setCartData(response?.data);
            })
            .catch((error) => {
                console.error('Error fetching cart data:', error);
            });
    }, [userId]); // Include userId in the dependency array to refetch when it changes
    console.log(cartData, "data--->>>")
    return (

        <Box p={10}>
            <h2>Your Cart</h2>


            <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={6}>
                {cartData && cartData?.map((item) => (
                    <Card key={item._id}>
                        <Link to={"/product-detail/" + item.product.productId}>
                            <CardBody>
                                
                                <Image
                                    mx="auto"
                                    src={item.product.imageUrls[0]}
                                    alt="Green double couch with wooden legs"
                                    borderRadius="lg"
                                    h="280px"
                                />
                                <Stack mt="6" spacing="3">
                                    <TruncatedHeading fontWeight="bold" size="sm">
                                        {item.product.name}
                                    </TruncatedHeading>
                                    <TruncatedHeading1>{item.product.description}</TruncatedHeading1>
                                    <Text color="blue.600" fontSize="2xl">
                                        ₹{item.product.price}
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                               
                            </CardFooter>
                        </Link>
                    </Card>
                ))}
            </Grid>

        </Box>

    )
}

export default CartPage