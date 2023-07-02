import type { Meta, StoryObj } from "@storybook/vue3";

import CycleDiagram from "./CycleDiagram.vue";

const meta = {
  title: "Example/CycleDiagram",
  component: CycleDiagram
} satisfies Meta<typeof CycleDiagram>;

export default meta;

type Story = StoryObj<typeof CycleDiagram>;

const items: string[] = [
  "AFC Bournemouth",
  "Arsenal",
  "Aston Villa",
  "Brentford",
  "Brighton",
  "Burnley",
  "Chelsea",
  "Crystal Palace",
  "Everton",
  "Fulham",
  "Liverpool",
  "Luton Town",
  "Manchester City",
  "Manchester United",
  "Newcastle",
  "Nottingham",
  "Sheffield United",
  "Tottenham",
  "West Ham",
  "Wolverhampton"
];

export const Basic: Story = {
  args: {
    items: items
  }
};
