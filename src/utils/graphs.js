const distinct = function(acc, curr, index, src) {
  return src.indexOf(curr) === index ? [...acc, curr] : acc;
};

export const adjacent = function(graph, vertex) {
  const edges = graph.edges.filter((edge) => edge[0] === vertex);

  return edges.map((edge) => edge[1]).reduce(distinct, []);
};

export const toGraph = function(fixtures) {
  const vertices = fixtures
    .flatMap((fixture) => [fixture.home.id, fixture.away.id])
    .reduce(distinct, []);

  const edges = fixtures
    .map((fixture) => {
      if (fixture.home.score > fixture.away.score) {
        return [fixture.home.id, fixture.away.id];
      } else if (fixture.away.score > fixture.home.score) {
        return [fixture.away.id, fixture.home.id];
      } else {
        return [];
      }
    })
    .filter((edge) => edge.length > 0);

  return { vertices, edges };
};

export const tarjan = function(vertices) {
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
      let stronglyConnectedVertices = [];
      let stronglyConnectedVertex;

      if (stack.length > 0) {
        do {
          stronglyConnectedVertex = stack.pop();
          stronglyConnectedVertices.push(stronglyConnectedVertex);
        } while (vertex !== stronglyConnectedVertex);

        if (stronglyConnectedVertices.length > 0) {
          components.push(stronglyConnectedVertices.map((v) => v.value));
        }
      }
    }
  };

  for (let vertex of vertices) {
    if (vertex.index === undefined) {
      strongConnect(vertex);
    }
  }

  return components;
};
