import { parseFixtures } from "../../src/utils";
import * as none from "../data/fixtures/none";
import * as some from "../data/fixtures/some";

const noneExpected = [];

test("parseFixtures (none)", () => {
  expect(parseFixtures(none)).toEqual(noneExpected);
});

const someExpected = [
  {
    away: {
      id: 57,
      name: "Arsenal",
      score: 3,
    },
    competitionId: 2021,
    home: {
      id: 63,
      name: "Fulham",
      score: 0,
    },
  },
  {
    away: {
      id: 340,
      name: "Southampton",
      score: 0,
    },
    competitionId: 2021,
    home: {
      id: 354,
      name: "Crystal Palace",
      score: 1,
    },
  },
  {
    away: {
      id: 1903,
      name: "Benfica",
      score: 5,
    },
    competitionId: 2017,
    home: {
      id: 5531,
      name: "FC Famalicão",
      score: 1,
    },
  },
];

test("parseFixtures (some)", () => {
  expect(parseFixtures(some)).toEqual(someExpected);
});
