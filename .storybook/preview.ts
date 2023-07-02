import type { Preview } from "@storybook/vue3";
import { useArgs } from "@storybook/client-api";

import "bulma/css/bulma.min.css";
import "../src/assets/main.scss";

const decorators = [
  (story, context) => {
    const [_, updateArgs] = useArgs();
    return story({ ...context, updateArgs });
  },
  () => ({ template: '<div id="app"><story/></div>' }),
];

const preview: Preview = {
  decorators: decorators,
};

export default preview;
