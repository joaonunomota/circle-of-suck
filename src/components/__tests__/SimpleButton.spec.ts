import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import SimpleButton from "../SimpleButton.vue";

describe("SimpleButton", () => {
  it("renders the button element", () => {
    const wrapper = mount(SimpleButton);
    expect(wrapper.find("button").exists()).to.be.true;
  });

  it("renders the default slot content", () => {
    const content = "toggle";
    const wrapper = mount(SimpleButton, {
      slots: {
        default: content
      }
    });
    expect(wrapper.text()).to.equal(content);
  });

  it("applies the is-primary class to the button", () => {
    const wrapper = mount(SimpleButton);
    expect(wrapper.find("button").classes()).to.include("is-primary");
  });
  
  it("emits a click event when the button is clicked", () => {
    const wrapper = mount(SimpleButton);
    wrapper.find("button").trigger("click");
    expect(wrapper.emitted("click")).to.have.lengthOf(1);
  });
});
