export const tarjan = function(graph) {
  let index = 0;
  let stack = [];
  let components = [];

  const strongConnect = function(vertex) {
    vertex.index = vertex.lowLink = index;
    ++index;
    stack.push(vertex);

    for (let neighbor of vertex.neighbors) {
      if (neighbor.index === undefined) {
        strongConnect(neighbor);
        vertex.lowLink = Math.min(vertex.lowLink, neighbor.lowLink);
      } else if (stack.indexOf(neighbor) > -1) {
        vertex.lowLink = Math.min(vertex.lowLink, neighbor.index);
      }
    }

    if (vertex.index === vertex.lowLink) {
      let vertices = [];
      let stronglyConnectedVertex;

      if (stack.length > 0) {
        do {
          stronglyConnectedVertex = stack.pop();
          vertices.push(stronglyConnectedVertex);
        } while (vertex !== stronglyConnectedVertex);

        if (vertices.length > 0) {
          components.push(vertices.map((v) => v.value));
        }
      }
    }
  };

  for (let vertex of graph.vertices) {
    if (vertex.index === undefined) {
      strongConnect(vertex);
    }
  }

  return components;
};
