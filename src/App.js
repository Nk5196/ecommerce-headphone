import { Box, Heading } from '@chakra-ui/react';
import Gallery from './Component/Corousel/Corousel';
import Navbar from './Component/Navbar'
import Product from './Component/Product';
import { useDispatch, useSelector } from 'react-redux';


function App() {
  const searchText = useSelector((state) => state.search.items);

  return (<Box >

      <Navbar />
      <Box p={['0', '5']} mx={['0', '5']}>
      {searchText.length==0 &&<Gallery />}
        <Product></Product>
      </Box>
   
  </Box>
  );
}

export default App;
