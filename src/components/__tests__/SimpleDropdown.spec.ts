import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import SimpleDropdown from "../SimpleDropdown.vue";

describe("SimpleDropdown", () => {
  const options = [
    { value: 1, name: "Option 1" },
    { value: 2, name: "Option 2" },
    { value: 3, name: "Option 3" }
  ];

  it("renders the options correctly", () => {
    const wrapper = mount(SimpleDropdown, {
      props: {
        options
      }
    });

    const selectOptions = wrapper.findAll("option");

    expect(selectOptions.length).toBe(options.length);

    options.forEach((option, index) => {
      expect(selectOptions[index].text()).toBe(option.name);
      expect(selectOptions[index].attributes("value")).toBe(option.value.toString());
    });
  });

  it("emits an event when the selected value changes", async () => {
    const wrapper = mount(SimpleDropdown, {
      props: {
        options
      }
    });

    const select = wrapper.find("select");
    await select.setValue(options[1].value);

    const emittedEvents = wrapper.emitted("update:modelValue");

    expect(emittedEvents && emittedEvents.length).toBe(1);
    expect(emittedEvents && emittedEvents[0][0]).toBe(options[1].value);
  });

  it("binds the selected value correctly", async () => {
    const wrapper = mount(SimpleDropdown, {
      props: {
        modelValue: options[1].value,
        options
      }
    });

    const select = wrapper.find("select");
    expect(select.element.value).toBe(options[1].value.toString());

    await select.setValue(options[2].value);

    const emittedEvents = wrapper.emitted("update:modelValue");

    expect(emittedEvents && emittedEvents.length).toBe(1);
    expect(emittedEvents && emittedEvents[0][0]).toBe(options[2].value);
  });
});
