import React, { Component } from 'react';
import {
  Container,
  ChakraProvider,
  Input,
  Flex,
  Grid,
  theme,
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
    HandleFileChange(event, convertedMatrix => {
      setData(convertedMatrix);
    });

    const reader = new FileReader();
    reader.onload = event => {
      setMatrix(
        JSON.parse(event.target.result).adjacencyMatrix[0].map(row =>
          row.slice()
        )
      );
    };
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

          <Button gridRow="3" colorScheme="blue" onClick={runShortestPath}>
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
          <NetworkGraph />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};

export default App;
