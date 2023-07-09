import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import FixtureTable from "../FixtureTable.vue";

describe("FixtureTable", () => {
  const fixtures = [
    {
      homeScore: 2,
      homeTeam: 1,
      awayScore: 1,
      awayTeam: 2
    },
    {
      homeScore: 3,
      homeTeam: 1,
      awayScore: 0,
      awayTeam: 3
    },
    {
      homeScore: 1,
      homeTeam: 2,
      awayScore: 1,
      awayTeam: 1
    },
    {
      homeScore: 0,
      homeTeam: 2,
      awayScore: 2,
      awayTeam: 3
    },
    {
      homeScore: 2,
      homeTeam: 3,
      awayScore: 0,
      awayTeam: 1
    },
    {
      homeScore: 2,
      homeTeam: 3,
      awayScore: 1,
      awayTeam: 2
    }
  ];

  const teams = [
    {
      id: 1,
      shortName: "Team A",
      tla: "A"
    },
    {
      id: 2,
      shortName: "Team B",
      tla: "B"
    },
    {
      id: 3,
      shortName: "Team C",
      tla: "C"
    }
  ];

  it("renders the fixture table correctly", () => {
    const wrapper = mount(FixtureTable, {
      props: {
        fixtures,
        teams
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

    const expectedResults = ["", "2 - 1", "3 - 0", "1 - 1", "", "0 - 2", "2 - 0", "2 - 1", ""];

    fixtureResults.forEach((result, index) => {
      expect(result.text()).toBe(expectedResults[index]);
    });
  });
});
