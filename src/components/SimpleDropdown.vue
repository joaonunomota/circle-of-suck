<template>
  <div class="select">
    <select v-model="value" :disabled="disabled">
      <option v-for="option of options" :key="option.value" :value="option.value">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { Option } from "../types";

export default defineComponent({
  name: "SimpleDropdown",
  props: {
    modelValue: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array as PropType<Option<number>[]>,
      default: () => []
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: number) {
        this.$emit("update:modelValue", value);
      }
    }
  }
});
</script>
