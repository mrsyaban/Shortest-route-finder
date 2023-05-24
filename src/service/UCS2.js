class Node {
    constructor(id) {
        this.id = id;
        this.path = [];
        this.visited = false;
        this.adjacent = {};
        this.totalDist = 0.0;
    }

    /* Getter */
    isVisited(){
        return this.visited;
    }

    getPath(){
        return this.path;
    }

    getDistance(){
        return this.distance;
    }

    getAdjacent(){
        return this.adjacent;
    }

    getId(){
        return this.id;
    }

    getTotal(){
        return this.totalDist;
    }

    /* Setter */
    hasVisited(){
        this.visited = true;
    }

    resetVisited(){
        this.visited = false;
    }

    addPath(nodeName){
        this.path.push(nodeName);
    }

    setDistance(dist){
        this.distance = dist;
    }

    addAdjacent(newNode, nodeDist){
        this.adjacent[newNode] = nodeDist;
    }
}


function matrixToNodes(matrix){
    const nodes = [];
    for (let i = 0; i < matrix.length; i++) {
        const node = new Node(i);
        nodes.push(node);
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j=0; j<matrix[i].length; j++){
            if (matrix[i][j] !== 0){
                nodes[i].addAdjacent(nodes[j], matrix[i][j]);
            }
        }
    }
    return nodes;
}


// students.sort(function(a, b) {
//     return a.score - b.score;
//   });
  

class UCS2 {
    constructor(start, goal, matrix ){
        this.goalId = this.goal;
        this.start = matrixToNodes(matrix)[start];
        this.goal = matrixToNodes(matrix)[goal];
        this.active = [this.start];
        this.proc = null;
    }

    search(){
        while(this.proc !== this.goalId){
            
            
            // pop active
            this.proc = this.active[0];

            // check if goal
            if (this.proc.getId() === this.goalId){
                return this.proc.getPath();
            }
            console.log(this.proc.isVisited());

            this.proc.hasVisited();
            this.active.shift();

            // visit all adjacent
            for (let adjNode in this.proc.getAdjacent()){
                console.log(typeof adjNode);
                //check if visited
                if (adjNode.isVisited()){
                    // copy node baru
                    const newNode = {...adjNode};
                    newNode.setDistance(adjNode.getTotal()+this.proc.getAdjacent()[adjNode]);
                    newNode.addPath(this.proc.id);
    
                    // push ke active
                    this.active.push(newNode);
                    this.active.sort((a, b) => a.getDistance() - b.getDistance());
                }
            }
            if (this.active.length === 0){
                return [];
            }
        }
        return this.goal.getPath();
    }
}

const graph = [
[0, 75, 0, 140, 0, 0, 0, 0, 0,0,0,0, 118],
[75, 0, 71, 0, 0, 0 ,0,0,0,0,0,0,0],
[0, 71, 0, 151, 0, 0, 0, 0,0,0,0,0,0],
[140, 0, 151, 0, 99, 0 ,0,0,80,0,0,0,0],
[0, 0, 0, 99, 0, 211 ,0,0,0,0,0,0,0],
[0, 0, 0, 0, 211, 0 ,101, 0, 0, 0,0 ,0,0],
[0, 0, 0, 0, 0, 101 ,0, 138, 97, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0 , 138, 0, 146, 0, 0, 0, 0],
[0, 0, 0, 80, 0, 0 ,97,146, 0, 120,0,0,0],
[0, 0, 0, 0, 0, 0, 0, 0, 120, 0, 75, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 75, 0, 70, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 0, 111],
[118, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 111, 0],
];

const start = 0;
const goal = 8;
const ucs = new UCS2(start, goal, graph);
console.log(ucs.search());