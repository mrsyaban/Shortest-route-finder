const PriorityQueue = require('js-priority-queue');

class UCS {
    constructor(start, goal, graph) {
        this.start = start;
        this.goal = goal;
        this.graph = graph;
        this.frontier = new PriorityQueue({ comparator: (a, b) => a.cost - b.cost });
        this.frontier.queue({ cost: 0, node: start });
        this.explored = new Set();
        this.cost = null;
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
                if (this.graph[current][neighbor] !== 0 && !this.explored.has(neighbor)) {
                const neighborCost = this.graph[current][neighbor];
                const newCost = cost + neighborCost;
                this.frontier.queue({ cost: newCost, node: neighbor });
                }
            }
        }
    }
}

// graph = [
//     [0, 75, 999999, 140, 999999, 999999, 999999, 999999, 999999,999999,999999,999999, 118],
//     [75, 0, 71, 999999, 999999, 999999 ,999999,999999,999999,999999,999999,999999,999999],
//     [999999, 71, 0, 151, 999999, 999999, 999999, 999999,999999,999999,999999,999999,999999],
//     [140, 999999, 151, 0, 99, 999999 ,999999,999999,80,999999,999999,999999,999999],
//     [999999, 999999, 999999, 99, 0, 211 ,999999,999999,999999,999999,999999,999999,999999],
//     [999999, 999999, 999999, 999999, 211, 0 ,101, 999999, 999999, 999999,999999 ,999999,999999],
//     [999999, 999999, 999999, 999999, 999999, 101 ,0, 138, 97, 999999, 999999, 999999, 999999],
//     [999999, 999999, 999999, 999999, 999999, 999999 , 138, 0, 146, 999999, 999999, 999999, 999999],
//     [999999, 999999, 999999, 80, 999999, 999999 ,97,146, 0, 120,999999,999999,999999],
//     [999999, 999999, 999999, 999999, 999999, 999999, 999999, 999999, 120, 0, 75, 999999, 999999],
//     [999999, 999999, 999999, 999999, 999999, 999999, 999999, 999999, 999999, 75, 0, 70, 999999],
//     [999999, 999999, 999999, 999999, 999999, 999999, 999999, 999999, 999999, 999999, 70, 0, 111],
//     [118, 999999, 999999, 999999, 999999, 999999, 999999, 999999, 999999, 999999, 999999, 111, 0],
// ]

// const start = 0;
// const goal = 8;
// const ucs = new UCS(start, goal, graph);
// ucs.search();

// if (ucs.cost !== null) {
//   console.log(`Biaya minimum dari ${start} ke ${goal} adalah ${ucs.cost}`);
// } else {
//   console.log(`Tidak ditemukan jalur dari ${start} ke ${goal}`);
// }
