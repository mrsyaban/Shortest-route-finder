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
} from '@chakra-ui/react';
// import NetworkGraph from './components/NetworkGraph';
import Maps from './components/Maps';
import { extend } from 'leaflet';
import { HandleFileChange } from './service/Utility';
import { Sigma} from 'react-sigma';

function handleClick() {
  console.log(this);
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

class NetworkGraph extends Component {
  render(){
    return (
      <Sigma
        graph={this.props.graph}
        settings={{
          drawEdges: true,
          drawLabels: true,
          labelThreshold: 6,
          defaultLabelSize: 14,
          defaultEdgeLabelSize: 14,
          edgeLabelSize: 'proportional',
        }}
        style={{ height: '500px', width: '100%' }}
      />
    );
  }

};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      prevData: null,
    };
    this.onFileChange = this.onFileChange.bind(this);
  }

  onFileChange = (event) => {
    HandleFileChange(event, (convertedMatrix) => {
      this.setState({ data: convertedMatrix });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      console.log('Data has changed:', this.state.data);
    }
  }

  logData() {
    console.log("button click!");
    console.log(this.statedata);
  }

  render (){
    return(
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

          <Button gridRow="3" colorScheme="blue" onClick={this.logData}>
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
          <NetworkGraph graph={this.state.data}/>
        </GridItem>
      </Grid>
    </ChakraProvider>
  )};
}

export default App;
