import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import FixtureTable from "../FixtureTable.vue";

describe("FixtureTable", () => {
  const fixtures = [
    {
      competitionId: 1,
      home: { id: 1, name: "Team A", score: 2 },
      away: { id: 2, name: "Team B", score: 1 }
    },
    {
      competitionId: 1,
      home: { id: 1, name: "Team A", score: 3 },
      away: { id: 3, name: "Team C", score: 0 }
    },
    {
      competitionId: 1,
      home: { id: 2, name: "Team B", score: 1 },
      away: { id: 1, name: "Team A", score: 1 }
    },
    {
      competitionId: 1,
      home: { id: 2, name: "Team B", score: 0 },
      away: { id: 3, name: "Team C", score: 2 }
    },
    {
      competitionId: 1,
      home: { id: 3, name: "Team C", score: 2 },
      away: { id: 1, name: "Team A", score: 0 }
    },
    {
      competitionId: 1,
      home: { id: 3, name: "Team C", score: 2 },
      away: { id: 2, name: "Team B", score: 1 }
    },
    {
      competitionId: 2,
      home: { id: 4, name: "Team D", score: 1 },
      away: { id: 5, name: "Team E", score: 1 }
    }
  ];

  it("renders the fixture table correctly", () => {
    const wrapper = mount(FixtureTable, {
      props: {
        competition: 1,
        fixtures
      }
    });

    // Check the table structure
    expect(wrapper.find("table").exists()).toBe(true);
    expect(wrapper.findAll("th").length).toBe(18);
    expect(wrapper.findAll("td").length).toBe(9);

    // Check the team names in the table headers
    const teamNames = ["Team A", "Team B", "Team C"];
    const headerTop = wrapper.findAll(".header-top");
    const headerBottom = wrapper.findAll(".header-bottom");
    const headerLeft = wrapper.findAll(".header-left");
    const headerRight = wrapper.findAll(".header-right");

    expect(headerTop.length).toBe(3);
    expect(headerBottom.length).toBe(3);
    expect(headerLeft.length).toBe(1);
    expect(headerRight.length).toBe(1);

    headerTop.forEach((header, index) => {
      expect(header.text()).toBe(teamNames[index]);
    });

    headerBottom.forEach((header, index) => {
      expect(header.text()).toBe(teamNames[index]);
    });

    headerLeft.forEach((header) => {
      expect(header.text()).toBe("HOME");
    });

    headerRight.forEach((header) => {
      expect(header.text()).toBe("HOME");
    });

    // Check the fixture results
    const fixtureResults = wrapper.findAll("td");

    expect(fixtureResults.length).toBe(9);

    const expectedResults = [
      "", "2 - 1", "3 - 0",
      "1 - 1", "", "0 - 2",
      "2 - 0", "2 - 1", ""
    ];

    fixtureResults.forEach((result, index) => {
      expect(result.text()).toBe(expectedResults[index]);
    });
  });
});
