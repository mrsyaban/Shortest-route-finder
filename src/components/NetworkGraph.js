import React from 'react';
import { Sigma} from 'react-sigma';


const NetworkGraph = (dataGraph) => {
  const [graphData, setGraph] = React.useState(dataGraph.graf);
  console.log("yang lama: ", graphData);
  console.log("input: ", dataGraph.graf);
  
  React.useEffect(() => {
    console.log("masok");
    setGraph(dataGraph.graf);
  }, [dataGraph.graf]);
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


export default NetworkGraph;


// import { Network } from 'vis-network';

// function tes() {
  //   return 200; // return the desired edge length
  // }
  
  // const options = {
    //   nodes: {
//     shape: 'circle',
//     color: '#8d99ae',
//   },
//   edges: {
  //     color: '#8d99ae',
  //     width: '8',
//     length: tes(),
//     label: {
  //       enabled: true,
  //       formatter: edge => {
    //         return edge.length;
    //       }
    //     }
    //   },
    //   layout: {
      //     hierarchical: false,
//     randomSeed: 2,
//     improvedLayout: false,
//     grid: {
//       type: 'grid',
//       factor: 1,
//       round: true
//     }
//   }
// };


// const nodes = [
//   { id: 'n1', label: 'Node 1', x: 0, y: 0, size: 10, color: '#FF0000' },
//   { id: 'n2', label: 'Node 2', x: 2, y: 0, size: 10, color: '#00FF00' },
//   { id: 'n3', label: 'Node 3', x: 1, y: 2, size: 10, color: '#0000FF' }
// ];


// const edges = [
//   { id: 'e1', source: 'n1', target: 'n2', label: 'Edge 1', color: '#FF0000' },
//   { id: 'e2', source: 'n2', target: 'n3', label: 'Edge 2', color: '#00FF00' },
//   { id: 'e3', source: 'n3', target: 'n1', label: 'Edge 3', color: '#0000FF' }
// ];

// const data = {
//   nodes: nodes,
//   edges:edges,
// };