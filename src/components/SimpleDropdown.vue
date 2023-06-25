<template>
  <div class="select">
    <select v-model="value">
      <option v-for="option of options" :key="option.id" :value="option.id">
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
  name: "simple-dropdown",
  props: {
    modelValue: {
      type: Number
    },
    options: {
      type: Array as PropType<Option[]>,
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
