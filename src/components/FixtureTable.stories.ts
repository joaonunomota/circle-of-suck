import type { Meta, StoryObj } from "@storybook/vue3";

import FixtureTable from "./FixtureTable.vue";

const meta = {
  title: "Example/FixtureTable",
  component: FixtureTable
} satisfies Meta<typeof FixtureTable>;

export default meta;

type Story = StoryObj<typeof FixtureTable>;

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

export const CompleteSeason: Story = {
  args: {
    competition: 1,
    fixtures: fixtures
  }
};

export const PartialSeason: Story = {
  args: {
    competition: 2,
    fixtures: fixtures
  }
};
