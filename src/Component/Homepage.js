import React from 'react'
import Gallery from './Corousel/Corousel'
import Product from './Product'
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';

const Homepage = () => {
    const searchText = useSelector((state) => state.search.items);

    return (
        <Box p={['0', '5']} mx={['0', '5']}>

            {searchText.length == 0 && <Gallery />}
            <Product/>
        </Box>
    )
}

export default Homepage