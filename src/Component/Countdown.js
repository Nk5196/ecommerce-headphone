import { Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set the time to midnight
    return midnight - now;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <Flex fontSize={'xl'} color={'white'}  borderRadius={'md'} w={['100px','115px']} py={1} ml={2} pl={5} bg={'blue.500'}>
      <p> {hours}: </p>
      <p> {minutes}: </p>
      <p> {seconds} </p>
    </Flex>
  );
};

export default CountdownTimer;
