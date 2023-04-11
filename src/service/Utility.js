function convertFile(jsonFile) {
  const obj = JSON.parse(jsonFile);
  const adjMatrix = obj.adjacencyMatrix[0].map(row => row.slice());
  const inputNodes = obj.nodes;

  // edit the nodes
  inputNodes.forEach(node => {
    node.label = node.id;
  });
  console.log("masok");
  // edit the edge 
  const edges = [];

  // if not directed graph
    for (let i = 0; i < adjMatrix.length; i++) {
        for (let j = 0; j < adjMatrix[i].length; j++) {
            if (adjMatrix[i][j] !== "0") {
                const edge = {};
                edge.length = String(adjMatrix[i][j]);
                edge.source = String(j);
                edge.target = String(i);
                edges.push(edge);
            }
        }
    }
  const data = {
      nodes: inputNodes,
      edges:edges,
  };
  return data;
}

export const HandleFileChange = (event, callback) => { 
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
    
      reader.onload = (event) => {
        const data = event.target.result;
        const converted = convertFile(data);
        callback(converted);
      };
    
      reader.readAsText(file);
    } catch (error) {
      console.error(`Error handling file: ${error}`);
    }
};