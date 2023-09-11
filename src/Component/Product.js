import { Box, Flex, Grid, Heading, Spacer } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

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
import { GiHamburgerMenu } from 'react-icons/gi';
import { useMediaQuery } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductList } from './Utils/ProductSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { user } from './Utils/authenticationSlice';
import { useToast } from '@chakra-ui/react';

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

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [isLargerThanMobile] = useMediaQuery('(min-width: 480px)');
  const [sortingOrder, setSortingOrder] = useState('default');
  const [originalProductData, setOriginalProductData] = useState([]);
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.search.items);
  const [cart, setCart] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const toast = useToast();

  const userdetails = useSelector((state) => state.authentication.user);
  console.log("userdetails", userdetails)
  const userId = userdetails?.userId


  let sortedProductData = [...productData];

  console.log("search text", searchText)
  if (searchText.length > 0) {
    const searchedproductData = productData.filter(item => {
      return (
        item
          .name
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||

        item
          .category
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item
          .brand
          .toLowerCase()
          .includes(searchText.toLowerCase())

      );
    })
    sortedProductData = [...searchedproductData]
  }
  else sortedProductData = [...originalProductData]

  async function getProductData() {
    const data = await fetch('https://dnyanodaya-backend-1.vercel.app/products');
    const jsondata = await data.json();
    console.log('product', jsondata);
    setProductData(jsondata);
    setOriginalProductData(jsondata); // Initialize originalProductData
    dispatch(ProductList(originalProductData))
  }

  useEffect(() => {
    getProductData();
  }, []);



  if (sortingOrder === 'lowToHigh') {
    sortedProductData.sort((a, b) => a.price - b.price);
  }
  if (sortingOrder === 'rating') {
    sortedProductData.sort((a, b) => b.rating - a.rating);
  }
  else if (sortingOrder === 'highToLow') {
    sortedProductData.sort((a, b) => b.price - a.price);
  }


  const handleAddCart = (productId) => {
    // Send a POST request to add a product to the cart
    if (!userId) {
      toast({
        title: 'Please Login First',
        description: 'Login to add products to your cart',
        status: 'error', // Use 'error' for indicating an error
        duration: 3000, // Duration in milliseconds
        isClosable: true,
      });
      return; // Exit the function early if there is no user
    }
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
  

  const removeFromCart = (productId) => {
    // Send a DELETE request to remove a product from the cart
    // axios.delete('/api/cart/remove-from-cart', {
    //   data: {
    //     userId: userdetails.userId, // Replace with the actual user ID
    //     productId,
    //   },
    // })
    //   .then((response) => {
    //     setCart(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error removing from cart:', error);
    //   });
  };

  return (
    <Box m={2} w="full">
      <Flex>
        <Heading ml={2} size="lg" display="flex" fontWeight="semibold">
          Our <Heading size="lg" ml={1}>
            Products
          </Heading>
        </Heading>
        <Spacer />
        {!isLargerThanMobile && (
          <Box mr={3} pr={1}>
            <Menu position="relative" top={-20}>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<GiHamburgerMenu />}
                variant="outline"
              />
              <MenuList>
                <MenuItem onClick={() => setSortingOrder('default')}>All Products</MenuItem>
                <MenuItem onClick={() => setSortingOrder('rating')}>Top rated</MenuItem>
                <MenuItem onClick={() => setSortingOrder('lowToHigh')}>Price low to high</MenuItem>
                <MenuItem onClick={() => setSortingOrder('highToLow')}>Price high to low</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        )}
      </Flex>
      <Tabs ml={2} variant="soft-rounded" colorScheme="gray" m={2}>
        {isLargerThanMobile && (
          <TabList gap={2} m={2}>
            <Button onClick={() => setSortingOrder('default')}>All products</Button>
            <Button onClick={() => setSortingOrder('rating')}>Top rated</Button>
            {/* <Button onClick={() => setSortingOrder('default')}>Popularity</Button> */}
            <Button onClick={() => setSortingOrder('lowToHigh')}>Price low to high</Button>
            <Button onClick={() => setSortingOrder('highToLow')}>Price high to low</Button>
          </TabList>
        )}
        <TabPanels>
          <TabPanel>
            <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={6}>
              {sortedProductData.map((item) => (
                <Card key={item._id}>
                  <Link to={"/product-detail/" + item._id}>
                    <CardBody>
                      <Image
                        mx="auto"
                        src={item.imageUrls[0]}
                        alt="Green double couch with wooden legs"
                        borderRadius="lg"
                        h="280px"
                      />
                      <Stack mt="6" spacing="3">
                        <TruncatedHeading fontWeight="bold" size="sm">
                          {item.name}
                        </TruncatedHeading>
                        <TruncatedHeading1>{item.description}</TruncatedHeading1>
                        <Text color="blue.600" fontSize="2xl">
                          ₹{item.price}
                        </Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing="2">
                        <Button variant="solid" size={['sm', 'md', 'lg']} colorScheme="blue">
                          Buy now
                        </Button>
                        <Button
                          variant="ghost"
                          size={['sm', 'md', 'lg']}
                          colorScheme="blue"
                          onClick={() => handleAddCart(item._id)} // Pass a callback function
                        >
                          Add to cart
                        </Button>

                      </ButtonGroup>
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </Grid>
          </TabPanel>

        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Product;
