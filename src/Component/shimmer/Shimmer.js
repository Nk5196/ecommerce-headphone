import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

const cardStyle = {
  width: '380px',
  height: '500px',
  marginLeft: '50px',
  backgroundColor: '#f0f0f0', // Optional: Set a background color for the cards
  borderRadius: '8px', // Optional: Add border-radius to create rounded corners for the cards
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle box shadow for a card-like appearance
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px', // Optional: Adjust font size for the content inside the cards
  fontWeight: 'bold', // Optional: Adjust font weight for the content inside the cards
  color: '#333', // Optional: Set text color for the content inside the cards
  marginRight: '40px', // Optional: Add spacing between the cards
};

function Shimmer() {
  return (
    <Box p={3}>
   <Heading size={'lg'} display={'flex'} mb={5} fontWeight={'semibold'}>Shop By <Heading size={'lg'} ml={1}> lifestyle</Heading></Heading>

    <Box className='shimmercarousel' display={['none','flex']} >

      <div style={cardStyle}></div>
      <div style={cardStyle}></div>
      <div style={cardStyle}></div>
    </Box>
    </Box>
  );
}

export default Shimmer;
