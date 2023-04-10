import React from 'react';
import {
  ChakraProvider,
  Input,
  Flex,
  Grid,
  theme,
  Heading,
  GridItem,
  Button,
  Select,
} from '@chakra-ui/react';
import NetworkGraph from './NetworkGraph';
import Maps from './Maps';

function handleClick() {
  console.log('Button clicked!');
}

function handleFileChange(fileInput) {
  console.log('File changed!');
}

// handle the toggle
function option(number) {
  if (number === 1) {
    return <NetworkGraph />;
  }
}

const Showing = () => {
  return option(1);
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid
        h="100vh"
        templateColumns="repeat(5,1fr)"
        templateRows="auto 1fr auto"
        gap={4}
      >
        <GridItem
          as="aside"
          colSpan="1"
          rowSpan="2"
          bg="#1d3258"
          minHeight="50"
          py="30px"
          borderRadius="20px 20px 20px 20px"
          justifySelf="center"
        >
          <Input
            colorScheme="blue"
            type="file"
            size="md"
            variant="outline"
            onChange={e => handleFileChange(e)}
          />

          <Select variant="filled" placeholder="Select Algorithm">
            <option value="option1">A*</option>
            <option value="option2">UCS</option>
          </Select>

          <Button gridRow="3" colorScheme="blue" onClick={handleClick}>
            Run
          </Button>
        </GridItem>
        <GridItem colSpan="4" rowSpan="1" alignItems="center">
          <Flex py="20px" alignItems="center">
            <Heading as="h1" fontSize="2.5em" textAlign={'center'}>
              Shortest Path Finder
            </Heading>
          </Flex>
        </GridItem>
        <GridItem
          colSpan="4"
          rowSpan="1"
          bg="#1d3258"
          borderRadius="20px 20px 20px 20px"
        >
          <Maps />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
