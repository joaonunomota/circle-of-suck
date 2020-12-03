import { tarjan } from "../../src/utils";

let v0 = { value: 0, neighbors: [] },
  v1 = { value: 1, neighbors: [] },
  v2 = { value: 2, neighbors: [] },
  v3 = { value: 3, neighbors: [] },
  v4 = { value: 4, neighbors: [] },
  v5 = { value: 5, neighbors: [] },
  v6 = { value: 6, neighbors: [] },
  v7 = { value: 7, neighbors: [] },
  v8 = { value: 8, neighbors: [] },
  v9 = { value: 9, neighbors: [] },
  v10 = { value: 10, neighbors: [] },
  v11 = { value: 11, neighbors: [] },
  v12 = { value: 12, neighbors: [] };

v0.neighbors.push(v1);
v0.neighbors.push(v5);
v2.neighbors.push(v0);
v2.neighbors.push(v3);
v3.neighbors.push(v2);
v3.neighbors.push(v5);
v4.neighbors.push(v2);
v4.neighbors.push(v2);
v5.neighbors.push(v4);
v6.neighbors.push(v0);
v6.neighbors.push(v9);
v7.neighbors.push(v6);
v7.neighbors.push(v8);
v8.neighbors.push(v7);
v8.neighbors.push(v9);
v9.neighbors.push(v10);
v9.neighbors.push(v11);
v10.neighbors.push(v12);
v11.neighbors.push(v4);
v11.neighbors.push(v12);
v12.neighbors.push(v9);

const graph = {
  vertices: [v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12],
};

const expected = [[1], [3, 2, 4, 5, 0], [11, 12, 10, 9], [6], [8, 7]];

test("tarjan", () => {
  expect(tarjan(graph)).toEqual(expected);
});
