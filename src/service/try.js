const jsonString = '{"nodes":[{"id":1,"label":"Node 1","x":100,"y":200,"color":"#FF0000"},{"id":2,"label":"Node 2","x":300,"y":400,"color":"#00FF00"},{"id":3,"label":"Node 3","x":500,"y":600,"color":"#0000FF"}]}';

const jsonObject = JSON.parse(jsonString);

const nodesArray = jsonObject.nodes;

console.log(nodesArray[1].id);