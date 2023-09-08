import { Box, Heading } from '@chakra-ui/react';
import Gallery from './Component/Corousel/Corousel';
import Navbar from './Component/Navbar'
import Product from './Component/Product';


function App() {
  return (<Box >
    <Navbar />
    <Box p={5}  mx={5}>
    <Gallery />
    <Product></Product>
    </Box>
  </Box>
  );
}

export default App;
