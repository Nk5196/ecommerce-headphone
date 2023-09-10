import { Box, Heading } from '@chakra-ui/react';
import Gallery from './Component/Corousel/Corousel';
import Navbar from './Component/Navbar'
import Product from './Component/Product';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';


function App() {

  return (<Box >

      <Navbar />
      <Outlet/>
   
  </Box>
  );
}

export default App;
