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
    let count = 1;
        for (let i = 0; i < adjMatrix.length; i++) {
            for (let j = 0; j < adjMatrix[i].length; j++) {
                if (adjMatrix[i][j] !== 0 && i!==j) {
                    const edge = {};
                    edge.id = String(count);
                    edge.length = adjMatrix[i][j];
                    edge.source = String(j+1);
                    edge.target = String(i+1);
                    edge.label = "Node" + String(count)
                    edges.push(edge);
                    count++;
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