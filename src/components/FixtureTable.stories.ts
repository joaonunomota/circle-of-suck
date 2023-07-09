import type { Meta, StoryObj } from "@storybook/vue3";

import FixtureTable from "./FixtureTable.vue";

const meta = {
  title: "Example/FixtureTable",
  component: FixtureTable
} satisfies Meta<typeof FixtureTable>;

export default meta;

type Story = StoryObj<typeof FixtureTable>;

const partialFixtures = [
  {
    homeScore: 2,
    homeTeam: 1,
    awayScore: 1,
    awayTeam: 2
  },
  {
    homeScore: 1,
    homeTeam: 2,
    awayScore: 1,
    awayTeam: 1
  }
];

const fixtures = [
  ...partialFixtures,
  {
    homeScore: 3,
    homeTeam: 1,
    awayScore: 0,
    awayTeam: 3
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

export const CompleteSeason: Story = {
  args: {
    fixtures: fixtures,
    teams: teams
  }
};

export const PartialSeason: Story = {
  args: {
    fixtures: partialFixtures,
    teams: teams
  }
};
