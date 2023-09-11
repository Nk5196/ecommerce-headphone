import { Box, Button, Flex, Heading, Img, Input, InputGroup, InputRightAddon, Text, isLargerThanMobile, useMediaQuery } from '@chakra-ui/react'
import { current } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CountdownTimer from './Countdown';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';


const ProductDetailPage = () => {
    const [product, setProduct] = useState({});
    const [isLargerThanMobile] = useMediaQuery("(min-width: 480px)");
    const [cart, setCart] = useState([]);
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const toast = useToast();
  
    const userdetails = useSelector((state) => state.authentication.user);
    console.log("userdetails", userdetails)
    const userId = userdetails?.userId
  
    const params = useParams();
    const { id } = params
    console.log("id", params)
    useEffect(() => {
        fetchRestraurant(id); // Rename function to fetchRestaurant
    }, [id]); // Include id in the dependency array to refetch when id changes

    async function fetchRestraurant(id) { // Rename function to fetchRestaurant
        // const data = await fetch(`https://dnyanodaya-backend-1.vercel.app/${id}`)
        const data = await fetch(`https://dnyanodaya-backend-1.vercel.app/products/${id}`)
        const jsonData = await data.json();
        setProduct(jsonData);
        console.log(jsonData)
        // setLoading(false); // Set loading to false after data is fetched
    }

    // if (loading) {
    //     return <div>Loading...</div>; // Return a loading indicator while data is fetched
    // }

    const handleAddCart = (productId) => {
        // Send a POST request to add a product to the cart
        axios.post('https://dnyanodaya-backend-1.vercel.app/api/cart/add-to-cart', {
            userId, // Use the user ID from your state or authentication
            productId, // Pass the productId argument
            quantity,
        })
            .then((response) => {
                setCart(response.data);
                setProductId('');
                setQuantity(1);

                // Show a success toast notification
                toast({
                    title: 'Product Added to Cart',
                    description: 'The product has been added to your cart.',
                    status: 'success',
                    duration: 3000, // Duration in milliseconds
                    isClosable: true,
                });
            })
            .catch((error) => {
                console.error('Error adding to cart:', error);
            });
    };


    return (
        <Box p={10}  >
            {isLargerThanMobile ? <Flex w={'full'}  >
                <Box w={['full', "40%"]} h={"80vh"} m={2} boxShadow={'base'} borderRadius={15}>
                    <Img p={5} mx={'auto'} h={'full'} src={product.imageUrls}></Img>
                </Box>
                <Box w={['full', "55%"]} p={5}>
                    <Heading size={'lg'} py={2} fontWeight={'semibold'}> {product.brand}</Heading>

                    <Heading size={'md'} fontWeight={'semibold'}>{product.name}</Heading>
                    <Text size={'lg'}>{product.description}</Text>
                    <Text size={'lg'} fontWeight={'semibold'}>Rating - {product.rating}</Text>
                    <Text fontSize={'2xl'} fontWeight={'semibold'}>Price - ₹{product.price}</Text>
                    <Flex><Text fontSize={'2xl'} fontWeight={'semibold'}>Offer Ending in - </Text><CountdownTimer /></Flex>
                    <InputGroup my={2} width={['250px', '450px']} size='md'>

                        <Input placeholder='Enter the Pincode' />
                        <InputRightAddon  > <Button variant={'ghost'}>Check</Button></InputRightAddon>
                    </InputGroup>
                    <Button
                        variant="ghost"
                        size={['sm', 'md', 'lg']}
                        colorScheme="blue"
                        onClick={() => handleAddCart(product._id)} // Pass a callback function
                    >
                        Add to cart
                    </Button>                </Box>
            </Flex>
                :
                <> <Box w={'full'} h={"90vh"} m={2} borderRadius={15}>
                    <Img mx={'auto'} h={'full'} src={product.imageUrls}></Img>
                </Box>
                    <Box w={'full'} >
                        <Heading size={'lg'} py={2} fontWeight={'semibold'}> {product.brand}</Heading>

                        <Heading size={'md'} fontWeight={'semibold'}>{product.name}</Heading>
                        <Text size={'lg'}>{product.description}</Text>
                        <Text size={'lg'} fontWeight={'semibold'}>Rating - {product.rating}</Text>
                        <Text fontSize={'2xl'} fontWeight={'semibold'}>Price - ₹{product.price}</Text>
                        <Flex><Text fontSize={['md', '2xl']} fontWeight={'semibold'}>Offer Ending in - </Text><CountdownTimer /></Flex>
                        <InputGroup my={2} width={['250px', '450px']} size='md'>
                            <Input placeholder='Enter the Pincode' />
                            <InputRightAddon  > <Button variant={'ghost'}>Check</Button></InputRightAddon>
                        </InputGroup>
                        <Button
                            variant="ghost"
                            size={['sm', 'md', 'lg']}
                            colorScheme="blue"
                            onClick={() => handleAddCart(product._id)} // Pass a callback function
                        >
                            Add to cart
                        </Button>        </Box>
                </>}
        </Box>
    )
}

export default ProductDetailPage