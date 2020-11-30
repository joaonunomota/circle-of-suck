import { parseCompetitions } from "../../src/utils";
import * as json from "../data/competitions";

const expected = [
  {
    id: 2021,
    name: "Premier League",
  },
  {
    id: 2017,
    name: "Primeira Liga",
  },
];

test("parseCompetitions", () => {
  expect(parseCompetitions(json)).toEqual(expected);
});