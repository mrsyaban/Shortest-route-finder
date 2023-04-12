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
