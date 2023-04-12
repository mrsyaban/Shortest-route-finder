import React from 'react';
import Graph from "react-graph-vis";
import Maps from './components/Maps';
import { HandleFileChange } from './service/Utility';
import { RunUCS } from './service/UCS';
import { RunAStar } from './service/AStar';
import NoAlgorithmAlert from './components/Alerts';
import {
  ChakraProvider,
  Input,
  Grid,
  Heading,
  GridItem,
  Button,
  Select,
  Stack,
  theme,
  Switch,
  FormControl,
  FormLabel,
  Text
} from '@chakra-ui/react';

const App = () => {
  const [data, setData] = React.useState({nodes:[{id:'1', x:0, y:0}], edges:[]});
  const [algo, setAlgo] = React.useState(0);
  const [start, setStart] = React.useState('');
  const [goal, setGoal] = React.useState('');
  const [matrix, setMatrix] = React.useState([]);
  const [coordinates, setCoor] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);



  const NetworkGraph = () => {
    // const [graphData, setGraph] = React.useState(data);
    
    // React.useEffect(() => {
    //   setGraph(data);
    // }, [data]);  

    // console.log("Graf : ",graphData);
    const options = {
      layout: {
        hierarchical: false,
        improvedLayout:false
      },
      physics:{
        enabled: true
      },
      interaction: {
        dragNodes: false
      },
      edges: {
        smooth: {
          type: 'curvedCW',
          forceDirection: 'none',
          roundness: 0.5,
        },
        color: "#001822",
        arrows: {
          to: {
            enabled: false
          },
          from: {
            enabled: false
          },
          middle: {
            enabled: false
          }},
        width: 2 
      },
      nodes:{
        borderWidth: 2,
        font: {
          size: 16,
          color: 'white',
        },
        color: "#005073",
        fixed: true,
        size: 10
      },
      height: "700px"
    };
  
    return (
      <Graph
        graph={data}
        options={options}
      />
    );
  };

  const onUseMap = event => {
    setIsChecked(!isChecked);
  };

  const ShowGraph = () => {
    if (isChecked){
      return (<Maps/>);
    } else {
      return (<NetworkGraph/>);
    }
  };

  // Choose File
  const onFileChange = event => {
    HandleFileChange(event, (convertedMatrix, adjMatrix, coor) => {
      setData(convertedMatrix);
      setMatrix(adjMatrix);
      setCoor(coor)
    });
  };

  // Change ALgorithm
  const onAlgoChange = event => {
    setAlgo((event.target.value));
  };

  // Find The Shortest Path
  const runShortestPath = () => {
    if (algo === "1") {
      RunAStar(data, matrix, start, goal, coordinates, newData => {
        setData(newData);
      });
    } else if (algo === "2") {
      console.log('masuk ucs');
      RunUCS(data, matrix, start, goal, newData => {
        setData(newData);
      });
    } else {
      // return <NoAlgorithmAlert />;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Grid
        templateRows='repeat(20, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={10}
        height='1080px'
        width='1920px'
        bg='#ccd6db'
      >
        <GridItem colSpan={5} rowSpan={1} py='5' color='#3d4041'>
            <Heading fontSize="2.5em" textAlign={'center' }>
              Shortest Path Finder
            </Heading>
        </GridItem>
        
        <GridItem
          height='400px'
          boxShadow='dark-lg' 
          colSpan={1} 
          rowSpan={18} ml='30px' 
          my='10px' rounded='md' 
          bg='#263A5F'
          px='20px'
        >
          <Grid
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

          </Grid>
        </GridItem>

        <GridItem colSpan={4} rowSpan={18}  bg='#ccd6db' mr='30px'>
            <Grid
              templateRows='repeat(18, 1fr)'
              templateColumns='repeat(1, 1fr)'
              gap={1}
              bg='#ccd6db'
            >
              <GridItem rowSpan={16}>
                <ShowGraph/>
              </GridItem>

              <GridItem rowSpan={2} allign='center'>
              <Grid
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(7, 1fr)'
              gap={1}
              bg='#ccd6db'
              >
                <GridItem colSpan={3}>
                </GridItem>
                <GridItem colSpan={1}>
                <FormControl 
                  widht='50px' 
                  rounded='md' 
                  display='flex'
                  flexDirection='row' 
                  px='10px'
                  alignItems='center'
                  color = '#263A5F'>
                  <FormLabel htmlFor='use-map' mb='0' fontSize='1.8em' fontWeight='bold'>
                    Use Map
                  </FormLabel>
                  <Switch id='use-map' size='lg' colorScheme='blue' isChecked={isChecked} onChange={onUseMap} />
                </FormControl>
                </GridItem>

                <GridItem colSpan={3}>
                </GridItem>

              </Grid>
            </GridItem>
          </Grid>
        </GridItem>

        <GridItem colSpan={5} rowSpan={1} bg='#263A5F' px='10px'>
          <Text >
            IF2240 Strategi Algoritma
          </Text>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};

export default App;
