import type { Edge, Fixture, Graph, Team } from "../types";

const toEdge = (fixture: Fixture): Edge => {
  const { awayScore, awayTeam, homeScore, homeTeam } = fixture;
  const weight = homeScore - awayScore;

  return weight > 0
    ? { head: homeTeam, tail: awayTeam, weight: weight }
    : { head: awayTeam, tail: homeTeam, weight: -weight };
};

const toGraph = (vertices: number[], edges: Edge[]): Graph => {
  const graph: Graph = {};

  for (const vertex of vertices) {
    graph[vertex] = {};
  }

  for (const edge of edges) {
    const { head, tail, weight } = edge;

    if (!graph[head][tail] || weight > graph[head][tail].weight) {
      graph[head][tail] = edge;
    }
  }

  return graph;
};

export const toCycle = (teams: Team[], fixtures: Fixture[]): number[] | null => {
  if (teams.length < 2) return null;
  if (fixtures.length < teams.length / 2) return null;

  const vertices = teams.map((x) => x.id);
  const edges = fixtures.map(toEdge).filter((x) => x.weight > 0);

  if (vertices.some((v) => !edges.some((e) => e.head === v) || !edges.some((e) => e.tail === v))) {
    return null;
  }

  const graph = toGraph(vertices, edges);
  let cycle: number[] = [];
  let total: number = 0;

  const dfs = (head: number, path: number[], sum: number, origin?: boolean): boolean => {
    if (!origin) path.push(head);

    const tails = Object.keys(graph[head])
      .map(Number)
      .filter((x) => !path.includes(x));

    if (tails.length > 0) {
      for (const tail of tails) {
        sum += graph[head][tail].weight;
        if (dfs(tail, path, sum)) return true;
        sum -= graph[head][tail].weight;
      }
    } else if (path.length === vertices.length) {
      if (sum > total) {
        total = sum;
        cycle = path;
        return true;
      }
    }

    path.pop();

    return false;
  };

  dfs(vertices[0], [], 0, true);

  return cycle.length > 0 ? cycle : null;
};
