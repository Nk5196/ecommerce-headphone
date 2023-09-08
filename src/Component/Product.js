import { Box, Flex, Grid, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Text, Divider, ButtonGroup } from '@chakra-ui/react'
import styled from 'styled-components';

const TruncatedHeading = styled.h1`
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 600;
  
`;

const TruncatedHeading1 = styled.h1`
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  
`;
const Product = () => {
    const [productData, setProductData] = useState([])

    async function getProductData() {
        const data = await fetch('https://dnyanodaya-backend-1.vercel.app/products')
        const jsondata = await data.json();
        console.log("product", jsondata)
        setProductData(jsondata)
    }

    useEffect(() => {
        getProductData()
    }, [])


    return (
        <Box m={2} w={'full'}>
            <Heading ml={2} size={'lg'} display={'flex'} fontWeight={'semibold'}>Our <Heading size={'lg'} ml={1}> Products</Heading></Heading>
            <Tabs ml={2} variant='soft-rounded' colorScheme='gray' m={2}>
                <TabList>
                    <Tab>Best Sellers</Tab>
                    <Tab>Top Earbuds</Tab>
                    <Tab>Popularity</Tab>
                    <Tab>Price low to high</Tab>
                    <Tab>Price high to low</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Grid templateColumns='repeat(4, 1fr)' gap={6}>

                            {productData.map((item) => <Card w={'250px'} >
                                <CardBody>
                                    <Image
                                        src={item.imageUrls[0]}
                                        alt='Green double couch with wooden legs'
                                        borderRadius='lg'
                                        h={'280px'}
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <TruncatedHeading fontWeight={'bold'} size='sm'> {item.name} </TruncatedHeading >

                                        <TruncatedHeading1>
                                            {item.description}
                                        </TruncatedHeading1>
                                        <Text color='blue.600' fontSize='2xl'>
                                        ₹{item.price}
                                        </Text>
                                    </Stack>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <ButtonGroup spacing='2'>
                                        <Button variant='solid' colorScheme='blue'>
                                            Buy now
                                        </Button>
                                        <Button variant='ghost' colorScheme='blue'>
                                            Add to cart
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>)}
                        </Grid>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>four!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>five!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default Product