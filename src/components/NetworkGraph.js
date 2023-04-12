// import React from 'react';
// import { Sigma, RelativeSize } from 'react-sigma';
// import { AspectRatio } from '@chakra-ui/react';

// const nodes = [
//   { id: 'n1', label: 'Node 1', x: 0, y: 0, size: 10, color: '#FF0000' },
//   { id: 'n2', label: 'Node 2', x: 0.2, y: 0, size: 10, color: '#00FF00' },
//   { id: 'n3', label: 'Node 3', x: 0.1, y: 0.2, size: 10, color: '#0000FF' },
// ];

// const edges = [
//   {
//     id: 'e1',
//     type: 'curvedLine',
//     source: 'n1',
//     target: 'n2',
//     label: 'Edge 1',
//     color: '#FF0000',
//   },
//   { id: 'e2', source: 'n2', target: 'n3', label: 'Edge 2', color: '#00FF00' },
//   { id: 'e3', source: 'n3', target: 'n1', label: 'Edge 3', color: '#0000FF' },
// ];

// const data = {
//   nodes: nodes,
//   edges: edges,
// };


// const NetworkGraph = dataGraph => {
//   const [graphData, setGraph] = React.useState(dataGraph.graf);
//   console.log('yang lama: ', graphData);
//   console.log('input: ', dataGraph.graf);

//   React.useEffect(() => {
//     console.log('masok');
//     setGraph(dataGraph.graf);
//   }, [dataGraph.graf]);
//   console.log('yang baru: ', graphData);
//   return (
//     <Sigma
//       renderer="svg"
//       graph={graphData}
//       settings={{
//         drawEdges: true,
//         drawLabels: true,
//         defaultLabelSize: 50,
//         defaultEdgeLabelSize: 50,
//         edgeLabelSize: 'proportional',
//         clone:false
//       }}
//       style={{ height: '200%', width: '100%' }}
//     >
//     </Sigma>
//   );
// };

// export default NetworkGraph;

// // import { Network } from 'vis-network';

// // function tes() {
// //   return 200; // return the desired edge length
// // }

// // const options = {
// //   nodes: {
// //     shape: 'circle',
// //     color: '#8d99ae',
// //   },
// //   edges: {
// //     color: '#8d99ae',
// //     width: '8',
// //     length: tes(),
// //     label: {
// //       enabled: true,
// //       formatter: edge => {
// //         return edge.length;
// //       }
// //     }
// //   },
// //   layout: {
// //     hierarchical: false,
// //     randomSeed: 2,
// //     improvedLayout: false,
// //     grid: {
// //       type: 'grid',
// //       factor: 1,
// //       round: true
// //     }
// //   }
// // };

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function NetworkGraph({ coordinates, lengths }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define the scale for the x-axis
    const xScale = d3.scaleLinear()
      .domain([0, coordinates.length - 1])
      .range([0, 500]);

    // Define the scale for the y-axis
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(lengths)])
      .range([500, 0]);

    // Define the line function to draw the graph
    const line = d3.line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d));

    // Draw the graph
    svg.append('path')
      .datum(lengths)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('d', line);
  }, [coordinates, lengths]);

  return (
    <svg ref={svgRef} width={500} height={500}></svg>
  );
}

export default NetworkGraph
