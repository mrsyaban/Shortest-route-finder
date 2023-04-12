// // // const jsonString = '{"nodes":[{"id":1,"label":"Node 1","x":100,"y":200,"color":"#FF0000"},{"id":2,"label":"Node 2","x":300,"y":400,"color":"#00FF00"},{"id":3,"label":"Node 3","x":500,"y":600,"color":"#0000FF"}]}';

// // // const jsonObject = JSON.parse(jsonString);

// // // const nodesArray = jsonObject.nodes;

// // // console.log(nodesArray[1].id);

// // import React, { useState } from 'react';
// // import { Sigma, EdgeShapes, NodeShapes, NOverlap, LoadJSON } from 'react-sigma';

// // function Graph() {
// //   const [graph, setGraph] = useState({
// //     nodes: [
// //       { id: 'n1', label: 'Node 1', x: 0, y: 0, size: 10, color: '#f00' },
// //       { id: 'n2', label: 'Node 2', x: 100, y: 0, size: 10, color: '#0f0' },
// //       { id: 'n3', label: 'Node 3', x: 50, y: 100, size: 10, color: '#00f' },
// //     ],
// //     edges: [
// //       { id: 'e1', source: 'n1', target: 'n2', label: 'Edge 1-2', color: '#f00' },
// //       { id: 'e2', source: 'n2', target: 'n3', label: 'Edge 2-3', color: '#0f0' },
// //       { id: 'e3', source: 'n3', target: 'n1', label: 'Edge 3-1', color: '#00f' },
// //     ],
// //   });

// //   const handleButtonClick = () => {
// //     // Create a new graph with different node positions
// //     const newGraph = {
// //       nodes: [
// //         { id: 'n1', label: 'Node 1', x: 0, y: 0, size: 10, color: '#f00' },
// //         { id: 'n2', label: 'Node 2', x: 0, y: 100, size: 10, color: '#0f0' },
// //         { id: 'n3', label: 'Node 3', x: 100, y: 100, size: 10, color: '#00f' },
// //       ],
// //       edges: [
// //         { id: 'e1', source: 'n1', target: 'n2', label: 'Edge 1-2', color: '#f00' },
// //         { id: 'e2', source: 'n2', target: 'n3', label: 'Edge 2-3', color: '#0f0' },
// //         { id: 'e3', source: 'n3', target: 'n1', label: 'Edge 3-1', color: '#00f' },
// //       ],
// //     };

// //     // Update the state with the new graph
// //     setGraph(newGraph);
// //   };

// //   return (
// //     <div>
// //       <button onClick={handleButtonClick}>Update Graph</button>
// //       <Sigma
// //         graph={graph}
// //         settings={{
// //           edgeColor: 'default',
// //           defaultEdgeColor: '#aaa',
// //           nodeLabelColor: 'default',
// //           defaultNodeLabelColor: '#000',
// //           minNodeSize: 5,
// //           maxNodeSize: 20,
// //           minEdgeSize: 1,
// //           maxEdgeSize: 5,
// //           zoomMin: 0.1,
// //           zoomMax: 10,
// //         }}
// //       >
// //         <EdgeShapes default="line" />
// //         <NodeShapes default="circle" />
// //         <NOverlap />
// //         <LoadJSON />
// //       </Sigma>
// //     </div>
// //   );
// // }

// // export default Graph;
// <GridItem colSpan={4} rowSpan={6} rounded='md' bg='papayawhip'>
//     <Sigma
//     graph={graphData}
//     settings={{
//       drawEdges: true,
//       drawLabels: true,
//       defaultLabelSize: 14,
//       defaultEdgeLabelSize: 14,
//       edgeLabelSize: 'proportional',
//       container: document.getElementById("sigma-container"),
//       renderer: {
//         containerClass: "sigma-container", // specify a class for the container element
//         type: "canvas",
//         setSize: "fixed",
//         width: "100%",
//         height: "100%",
//         clearCanvas: false,
//         freeStyle: true,
//         autoRescale: true,
//         style: {
//           border: "1px solid black"
//         }
//       },
//     }}
//     style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0}}

//     />
// </GridItem>

if (typeof tes === 'undefined' ){
    console.log("anjay");
}