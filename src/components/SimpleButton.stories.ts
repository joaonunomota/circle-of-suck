import type { Meta, StoryObj } from "@storybook/vue3";

import SimpleButton from "./SimpleButton.vue";

const meta = {
  title: "Example/SimpleButton",
  component: SimpleButton
} satisfies Meta<typeof SimpleButton>;

export default meta;

type Story = StoryObj<typeof SimpleButton>;

export const Basic: Story = {
  args: {
    // @ts-ignore
    default: "Button"
  },
  argTypes: {
    // @ts-ignore
    default: {
      control: "text"
    }
  }
};
