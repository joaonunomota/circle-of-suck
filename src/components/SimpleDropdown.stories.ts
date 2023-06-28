import type { Meta, StoryObj } from "@storybook/vue3";

import SimpleDropdown from "./SimpleDropdown.vue";

const meta = {
  title: "Example/SimpleDropdown",
  component: SimpleDropdown
} satisfies Meta<typeof SimpleDropdown>;

export default meta;

type Story = StoryObj<typeof SimpleDropdown>;

export const WithOptions: Story = {
  args: {
    modelValue: 0,
    options: [
      { id: 0, name: "Option 1" },
      { id: 1, name: "Option 2" },
      { id: 2, name: "Option 3" }
    ]
  },
  // @ts-ignore
  argTypes: { "update:modelValue": { table: { disable: true } } },
  decorators: [
    (args, { updateArgs }) => ({
      setup() {
        return { args };
      },
      template: '<story v-bind="args" @update:modelValue="update" />',
      methods: {
        update(modelValue: number) {
          updateArgs({ ...args, modelValue });
        }
      }
    })
  ]
};
