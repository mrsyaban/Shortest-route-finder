class AStar {
    constructor(start, goal, graph, heuristic) {
        this.start = start;
        this.goal = goal;
        this.graph = graph;
        this.heuristic = heuristic;
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

export const RunAStar = (event, callback) => {
    
}
  
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

// const heuristic = (node) => {
//     const coordinates = [
//         [0, 0],
//         [1, 0],
//         [2, 0],
//         [3, 0],
//         [4, 0],
//     ];
//     const dx = coordinates[node][0] - coordinates[goal][0];
//     const dy = coordinates[node][1] - coordinates[goal][1];
//     return Math.sqrt(dx * dx + dy * dy);
// };

// const aStar = new AStar(start, goal, graph, heuristic);
// const shortestPath = aStar.search();
// console.log(shortestPath);

// // Menghitung total biaya
// const totalCost = aStar.gScore.get(goal);
// console.log("Total Biaya: " + totalCost);