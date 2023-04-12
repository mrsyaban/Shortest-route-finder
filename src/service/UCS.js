const PriorityQueue = require('js-priority-queue');

class UCS {
  constructor(start, goal, graph) {
    this.start = start;
    this.goal = goal;
    this.graph = graph;

    this.frontier = new PriorityQueue({
      comparator: (a, b) => a.cost - b.cost,
    });
    this.frontier.queue({ cost: 0, node: start });

    this.explored = new Set();
    this.cost = null;
    this.cameFrom = {};
    this.cameFrom[start] = null;
  }

  search() {
    while (this.frontier.length > 0) {
      const state = this.frontier.dequeue();
      const cost = state.cost;
      const current = state.node;
      if (current === this.goal) {
        this.cost = cost;
        return;
      }

      this.explored.add(current);
      for (let neighbor = 0; neighbor < this.graph.length; neighbor++) {
        if (
          this.graph[current][neighbor] !== 0 &&
          !this.explored.has(neighbor)
        ) {
          const neighborCost = this.graph[current][neighbor];
          const newCost = cost + neighborCost;
          this.frontier.queue({ cost: newCost, node: neighbor });
          this.cameFrom[neighbor] = current;
        }
      }
    }
  }

  shortestPath() {
    if (this.cost === null) {
      return null;
    }
    let path = [this.goal];
    let current = this.goal;
    while (current !== this.start) {
      current = this.cameFrom[current];
      path.unshift(current);
    }
    return path;
  }
}

function isResult(start, goal, edge) {
  if (
    (edge.from === start && edge.to === goal) ||
    (edge.from === goal && edge.to === start)
  ) {
    return true;
  } else {
    return false;
  }
}

export const RunUCS = (graph, matrix, start, goal, callback) => {
  console.log('start: ', start, 'goal: ', goal);
  console.log('matrix: ', matrix);
  const ucs = new UCS(Number(start)-1, Number(goal)-1, matrix);
  ucs.search();
  const resPath = ucs.shortestPath();

  const newGraph = {
    nodes: [],
    edges: [],
  };

  if (resPath !== null){
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
    newGraph.nodes = newNodes;
    newGraph.edges = newEdges;
  }
  callback(newGraph, ucs.cost);
};

// graph = [
// [0, 75, 0, 140, 0, 0, 0, 0, 0,0,0,0, 118],
// [75, 0, 71, 0, 0, 0 ,0,0,0,0,0,0,0],
// [0, 71, 0, 151, 0, 0, 0, 0,0,0,0,0,0],
// [140, 0, 151, 0, 99, 0 ,0,0,80,0,0,0,0],
// [0, 0, 0, 99, 0, 211 ,0,0,0,0,0,0,0],
// [0, 0, 0, 0, 211, 0 ,101, 0, 0, 0,0 ,0,0],
// [0, 0, 0, 0, 0, 101 ,0, 138, 97, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0 , 138, 0, 146, 0, 0, 0, 0],
// [0, 0, 0, 80, 0, 0 ,97,146, 0, 120,0,0,0],
// [0, 0, 0, 0, 0, 0, 0, 0, 120, 0, 75, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 75, 0, 70, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 0, 111],
// [118, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 111, 0],
// ];

// const start = 0;
// const goal = 8;
// const ucs = new UCS(start, goal, graph);
// ucs.search();

// if (ucs.cost !== null) {
//     console.log(`Biaya minimum dari ${start} ke ${goal} adalah ${ucs.cost}`);
//     const path = ucs.shortestPath();
//     console.log(`Jalur terpendek dari ${start} ke ${goal} adalah: ${path.join(' -> ')}`);
//     } else {
//     console.log(`Tidak ditemukan jalur dari ${start} ke ${goal}`);
// }
