import React from 'react';

const cardStyle = {
  width: '290px',
  height: '240px',
  marginLeft: '40px',
  backgroundColor: '#f0f0f0', // Optional: Set a background color for the cards
  borderRadius: '8px', // Optional: Add border-radius to create rounded corners for the cards
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle box shadow for a card-like appearance
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px', // Optional: Adjust font size for the content inside the cards
  fontWeight: 'bold', // Optional: Adjust font weight for the content inside the cards
  color: '#333', // Optional: Set text color for the content inside the cards
  marginRight: '20px', // Optional: Add spacing between the cards
};

function ShimmerRestro() {
  return (<div>
    <div className='ShimmerRestrocarousel' style={{ display: 'flex', marginTop:'20px'}}>
      <div style={cardStyle}></div>
      <div style={cardStyle}></div>
      <div style={cardStyle}></div>
      <div style={cardStyle}></div>
    </div>
        <div className='ShimmerRestrocarousel' style={{ display: 'flex', marginTop:'20px'}}>
        <div style={cardStyle}></div>
        <div style={cardStyle}></div>
        <div style={cardStyle}></div>
        <div style={cardStyle}></div>
      </div>
      </div>
  );
}

export default ShimmerRestro;
