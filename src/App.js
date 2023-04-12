import React, { Component } from 'react';
import {
  Container,
  ChakraProvider,
  Input,
  Flex,
  Grid,
  Heading,
  GridItem,
  Button,
  Select,
  Box,
  Stack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  AspectRatio
} from '@chakra-ui/react';
// import NetworkGraph from './components/NetworkGraph';
import Maps from './components/Maps';
import { extend } from 'leaflet';
import { HandleFileChange } from './service/Utility';
// import NetworkGraph from './components/NetworkGraph';
import { Sigma, EdgeShapes, CustomEdge } from 'react-sigma';
import { RunUCS } from './service/UCS';
import { RunAStar } from './service/AStar';
import { useDisclosure } from '@chakra-ui/react';

import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
      100: "teal.500",
      // ...
      900: "#1a202c",
    },
  },
})

const NoAlgorithmAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <React.Fragment>
      <Button onClick={onOpen}>Discard</Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to discard all of your notes? 44 words will be
            deleted.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  );
};

const App = () => {
  const [data, setData] = React.useState({nodes:[{id:'1', x:0, y:0}], edges:[]});
  const [algo, setAlgo] = React.useState(0);
  const [start, setStart] = React.useState('');
  const [goal, setGoal] = React.useState('');
  const [matrix, setMatrix] = React.useState([]);
  const [cordinate, setCoor] = React.useState([]);

  const NetworkGraph = () => {
    const [graphData, setGraph] = React.useState(data);
    
    React.useEffect(() => {
      setGraph(data);
    }, [data]);

    console.log("Graf : ",graphData);

    return (
      <Sigma
        graph={graphData}
        settings={{
          renderer: 'canvas',
          labelOffset: 10, labelColor: "#000000",
          labelThreshold: 0,
          defaultEdgeType: "bold",
          drawLabels: true,
          defaultLabelSize: 30,
          defaultEdgeLabelSize: 30,
        }}
        style={{ height: '500px', width: '100%' }}
      >
      <EdgeShapes default="curvedLine"/>
      </Sigma>
    );
  };

  const onFileChange = event => {
    HandleFileChange(event, (convertedMatrix, adjMatrix, coor) => {
      setData(convertedMatrix);
      setMatrix(adjMatrix);
      setCoor(coor);
    });
  };

  const onAlgoChange = event => {
    setAlgo((event.target.value));
  };

  const runShortestPath = () => {
    if (algo === "1") {
      // RunAStar(data, newData => {
      //   setData(newData);
      // });
    } else if (algo === "2") {
      console.log('masuk ucs');
      RunUCS(data, matrix, start, goal, newData => {
        setData(newData);
      });
    } else {
      return <NoAlgorithmAlert />;
    }
  };
  // logData() {
  //   console.log('button click!');
  //   console.log(this.statedata);
  // }

  return (
    <ChakraProvider theme={theme}>
      <Grid
        h = '1000px'
        templateRows='repeat(8, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={2}
      >
        <GridItem colSpan={5} rowSpan={1} py='5'>
            <Heading fontSize="2.5em" textAlign={'center'}>
              Shortest Path Finder
            </Heading>
        </GridItem>
        <GridItem colSpan={1} rowSpan={7} margin='10px' rounded='md' bg='#1d3258'>
        <Grid
        h='500px'
        templateColumns='repeat(1, 1fr)'
        templateRows='repeat(5, 1fr)'
        gap={4}
      >
        <GridItem py='10'>
        <Input
            colorScheme="blue"
            type="file"
            size="md"
            variant="outline"
            onChange={onFileChange}
          />
        </GridItem>

        <GridItem >
        <Stack spacing={1}>
            <Input
              variant="outline"
              placeholder="input start node"
              onChange={event => {
                setStart(event.target.value);
              }}
            />
            <Input
              variant="outline"
              placeholder="input goal node"
              onChange={event => {
                setGoal(event.target.value);
              }}
            />
          </Stack>
          <Select
            variant="filled"
            placeholder="Select Algorithm"
            onChange={onAlgoChange}
          >
            <option value="1">A*</option>
            <option value="2">UCS</option>
          </Select>
        </GridItem>
        <GridItem align='center' py='10' >
          <Button gridRow="3" bgGradient="linear(to-r, teal.500, blue.500)" _hover={{ bgGradient: "linear(to-r, blue.500, teal.500)" }} colorScheme="blue" onClick={runShortestPath}>
          Run
          </Button>
        </GridItem>

        <GridItem  >
        </GridItem>

        <GridItem  >
        </GridItem>
        </Grid>
        </GridItem>

        <GridItem colSpan={4} rowSpan={6} margin='10px' rounded='md' bg='papayawhip'>

        <NetworkGraph/>

        </GridItem>

        <GridItem colSpan={4} rowSpan={1} margin='10px' rounded='md' bg='#1d3258'>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};

export default App;
