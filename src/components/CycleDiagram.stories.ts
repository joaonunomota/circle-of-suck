import type { Meta, StoryObj } from "@storybook/vue3";

import CycleDiagram from "./CycleDiagram.vue";
import type { Team } from "../types";

const meta = {
  title: "Example/CycleDiagram",
  component: CycleDiagram
} satisfies Meta<typeof CycleDiagram>;

export default meta;

type Story = StoryObj<typeof CycleDiagram>;

const cycle: Team[] = [
  { id: 1, shortName: "FC Porto", tla: "FCP" },
  { id: 2, shortName: "SL Benfica", tla: "BEN" },
  { id: 3, shortName: "Sporting CP", tla: "SCP" },
  { id: 4, shortName: "SC Braga", tla: "SCB" },
  { id: 5, shortName: "FC Arouca", tla: "FCA" },
  { id: 6, shortName: "Vitória SC", tla: "GUI" },
];

export const Basic: Story = {
  args: {
    cycle: cycle
  },
  decorators: [() => ({ template: "<div style=\"height: 75vh;\"><story/></div>" })]
};
