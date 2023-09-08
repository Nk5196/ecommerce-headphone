import React, { useEffect, useRef, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Corousel.css';
import Shimmer from '../shimmer/Shimmer';
import { Box, Heading, Text } from '@chakra-ui/react';

const handleDragStart = (e) => e.preventDefault();




const Gallery = () => {
    const carouselRef = useRef(null);
    const [corouseldata, setcorouseldata] = useState([])
   

    async function getCorouselData() {
        try {
            const cordata = await fetch('https://dnyanodaya-backend-1.vercel.app/headphone-corousel'); // Await the fetch function
            if (!cordata.ok) {
                throw new Error('Failed to fetch data'); // Handle any fetch errors
            }
            const jsondata = await cordata.json();
            console.log("data--",jsondata.corouselData)
            setcorouseldata(jsondata.corouselData)
         } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCorouselData();
    }, []);


    console.log("corouseldata--->", corouseldata);

    // Ensure that corouseldata is an array before mapping over it
    if (!Array.isArray(corouseldata)) {
        return null;
    }

    const items = corouseldata.map((item, index) => (
        <Box padding={1} key={index} >
            <img
                src={item.url}
                onDragStart={handleDragStart}
                role="presentation"
            />
            <Text ml={-8} fontSize={'2xl'} fontWeight={'semibold'} textAlign={'center'}>{item.text}</Text>
        </Box>
    ));

    return (corouseldata.length === 0) ? (<Shimmer />) : (
        <Box className="carousel" p={3}>
            <Heading size={'lg'} display={'flex'} fontWeight={'semibold'}>Shop By <Heading size={'lg'} ml={1}> lifestyle</Heading></Heading>
            <AliceCarousel
                mouseTracking
                autoPlay
                infinite
                autoPlayInterval={3000}
                items={items}
                ref={carouselRef}
                disableButtonsControls={true}
                responsive={{
                    0: { items: 1 },
                    768: { items: 3 },
                }}
            />
        </Box>
    );
};

export default Gallery;
