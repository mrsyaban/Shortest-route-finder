class AStar {
    constructor(start, goal, graph, heuristic) {
        this.start = start;
        this.goal = goal;
        this.graph = graph;
        this.heuristic = heuristic;
        // this.coordinates = coordinates;
        this.frontier = [{ node: start, cost: 0 }];
        this.explored = new Set();
        this.cameFrom = new Map();
        this.gScore = new Map();
        this.gScore.set(start, 0);
    }



    search() {
        while (this.frontier.length > 0) {
            this.frontier.sort((a, b) => a.cost - b.cost);
            const { node: current } = this.frontier.shift();
            if (current === this.goal) {
                return this.reconstructPath(current);
            }
            
            this.explored.add(current);
            for (let neighbor = 0; neighbor < this.graph.length; neighbor++) {
                if (this.graph[current][neighbor] !== 0 && !this.explored.has(neighbor)) {
                    const neighborCost = this.graph[current][neighbor];
                    const tentativeGScore = this.gScore.get(current) + neighborCost;
                    if (!this.frontier.some((item) => item.node === neighbor) || tentativeGScore < this.gScore.get(neighbor)) {
                        this.cameFrom.set(neighbor, current);
                        this.gScore.set(neighbor, tentativeGScore);
                        const fScore = tentativeGScore + this.heuristic(neighbor);
                        if (!this.frontier.some((item) => item.node === neighbor)) {
                            this.frontier.push({ node: neighbor, cost: fScore });
                        } else {
                            this.frontier = this.frontier.map((item) => (item.node === neighbor ? { node: neighbor, cost: fScore } : item));
                        }
                    }
                }
            }
        }
        return null;
    }
  
    reconstructPath(current) {
      const path = [current];
      while (this.cameFrom.has(current)) {
        current = this.cameFrom.get(current);
        path.unshift(current);
      }
      return path;
    }
}


function isResult(start, goal, edge) {
    if (
      (edge.source === start && edge.target === goal) ||
      (edge.source === goal && edge.target === start)
    ) {
      return true;
    } else {
      return false;
    }
}
  
export const RunAStar = (graph, matrix, start, goal, coordinates, callback) => {
    
    const heuristic = (node) => {
        const dx = coordinates[node][0] - coordinates[Number(goal)-1][0];
        const dy = coordinates[node][1] - coordinates[Number(goal)-1][1];
        return Math.sqrt(dx * dx + dy * dy);
    };

    console.log('start: ', start, 'goal: ', goal);
    console.log('matrix: ', matrix);
    const astar = new AStar(Number(start)-1, Number(goal)-1, matrix, heuristic);
    const resPath = astar.search();
    console.log("resPath: ", resPath);
    
    // color nodes
    const newNodes = [];
    for (let i = 0; i < graph.nodes.length; i++) {
      const node = { ...graph.nodes[i] };
      node.color = "#005073";
      if (resPath.some((res) => res+1 === Number(graph.nodes[i].id))) {
        node.color = '#339900';
      }
      newNodes.push(node);
    }
  
    // color edges
    const newEdges = [];
    for (let i = 0; i < graph.edges.length; i++) {
      const edge = { ...graph.edges[i] };
      edge.color = "#001822";
      for (let j = 0; j < resPath.length - 1; j++) {
        if (isResult(String(resPath[j]+1), String(resPath[j + 1]+1), edge)) {
          console.log("edge: ", resPath[j], resPath[j+1]);
          edge.color = '#339900';
        }
      }
      newEdges.push(edge);
    }
  
    const newGraph = {
      nodes: newNodes,
      edges: newEdges,
    };
  
    callback(newGraph);
};
  
  
// // Contoh
// const start = 0;
// const goal = 4;
// const graph = [
// [0, 1, 5, 0, 0],
// [0, 0, 0, 3, 0],
// [0, 0, 0, 2, 0],
// [0, 0, 0, 0, 4],
// [0, 0, 0, 0, 0],
// ];

// const aStar = new AStar(start, goal, graph, coordinates);
// const shortestPath = aStar.search();
// // console.log(shortestPath);

// // Menghitung total biaya
// // const totalCost = aStar.gScore.get(goal);
// // console.log("Total Biaya: " + totalCost);