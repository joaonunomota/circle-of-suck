import type { Option } from "../types";

export const toOption = (value: number, name?: string): Option<number> => ({
  value: value,
  name: name || value.toString()
});
