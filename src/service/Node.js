class Node {
    constructor() {
        this.path = [];
        this.visited = false;
        this.distance = 0.0;
        this.adjacent = {};
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

    /* Setter */
    hasVisited(){
        this.visited = true;
    }

    addPath(nodeName){
        this.path.push(nodeName);
    }

    setDistance(dist){
        this.distance = dist;
    }

    addAdjacent(newNode, newValue){
        this.adjacent[newNode] = newValue;
    }

}
