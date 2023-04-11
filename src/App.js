import React, { Component } from 'react';
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
  Box
} from '@chakra-ui/react';
// import NetworkGraph from './components/NetworkGraph';
import Maps from './components/Maps';
import { extend } from 'leaflet';
import { HandleFileChange } from './service/Utility';
import NetworkGraph from './components/NetworkGraph';
import { Sigma } from 'react-sigma';

function handleClick() {
  console.log(this);
}

// handle the toggle
// function option(number) {
//   if (number === 1) {
//     return <NetworkGraph />;
//   }
// }

// const Showing = () => {
//   return option(1);
// };

const nodes = [
  { id: 'n1', label: 'Node 1', x: 0, y: 0, size: 10, color: '#FF0000' },
  { id: 'n2', label: 'Node 2', x: 2, y: 0, size: 10, color: '#00FF00' },
  { id: 'n3', label: 'Node 3', x: 1, y: 2, size: 10, color: '#0000FF' }
];


const edges = [
  { id: 'e1', source: 'n1', target: 'n2', label: 'Edge 1', color: '#FF0000' },
  { id: 'e2', source: 'n2', target: 'n3', label: 'Edge 2', color: '#00FF00' },
  { id: 'e3', source: 'n3', target: 'n1', label: 'Edge 3', color: '#0000FF' }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        nodes: [
          { id: '1', x: 0, y: 0, size: 10 },
          { id: '2', x: 0.2, y: 0, size: 10 },
        ],
        edges: [
          { id: '1',  label: 'Edge 1', source: '1', target: '2', length:2 },
        ],
      },
      prevData: null,
    };
    this.onFileChange = this.onFileChange.bind(this);
  }

  onFileChange = event => {
    HandleFileChange(event, convertedMatrix => {
      this.setState({ data: convertedMatrix });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      console.log('Data has changed:', this.state.data);
    }
  }

  logData() {
    console.log('button click!');
    console.log(this.statedata);
  }

  render() {

    console.log("renderrr");
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
              onChange={this.onFileChange}
            />

            <Select variant="filled" placeholder="Select Algorithm">
              <option value="option1">A*</option>
              <option value="option2">UCS</option>
            </Select>

            <Button gridRow="3" colorScheme="blue" onClick={() => {}}>
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
            rowSpan="3"
            bg="#1d3258"
            borderRadius="20px 20px 20px 20px"
          >

          <NetworkGraph graf={this.state.data}/>

          </GridItem>
        </Grid>
      </ChakraProvider>
    );
  }
}

export default App;
