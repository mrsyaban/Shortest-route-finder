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
import { Sigma } from 'react-sigma';
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

  const NetworkGraph = () => {
    const [graphData, setGraph] = React.useState(data);
    console.log("yang lama: ", graphData);
    console.log("input: ", data);
    
    React.useEffect(() => {
      setGraph(data);
    }, [data]);

    console.log("yang baru: ",graphData);
    return (
      <Sigma
        graph={graphData}
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
  };

  const onFileChange = event => {
    HandleFileChange(event, (convertedMatrix, adjMatrix) => {
      setData(convertedMatrix);
      setMatrix(adjMatrix);
      console.log("hanan:", adjMatrix);
    });
  };

  const onAlgoChange = event => {
    setAlgo((event.target.value));
  };

  const runShortestPath = () => {
    console.log('algo: ', algo, typeof(algo));
    if (algo === "1") {
      // RunAStar(data, newData => {
      //   setData(newData);
      // });
    } else if (algo === "2") {
      console.log('masuk ucs');
      RunUCS(data, matrix, start, goal, newData => {
        setData(newData);
        console.log('ucs: ', data);
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
          <Input
            colorScheme="blue"
            type="file"
            size="md"
            variant="outline"
            onChange={onFileChange}
          />

          <Select
            variant="filled"
            placeholder="Select Algorithm"
            onChange={onAlgoChange}
          >
            <option value="1">A*</option>
            <option value="2">UCS</option>
          </Select>

          <Button gridRow="3" bgGradient="linear(to-r, teal.500, blue.500)" _hover={{ bgGradient: "linear(to-r, blue.500, teal.500)" }} colorScheme="blue" onClick={runShortestPath}>
            Run
          </Button>

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
        </GridItem>

        <GridItem colSpan={4} rowSpan={6} rounded='md' py='10' bg='papayawhip'>

        <NetworkGraph/>
        </GridItem>

        <GridItem colSpan={4} rowSpan={1} rounded='md' bg='#1d3258'>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};

export default App;
