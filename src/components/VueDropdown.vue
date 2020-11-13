<template>
  <div class="select">
    <select v-model="value">
      <option v-for="option of options" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "vue-dropdown",
  props: {
    modelValue: {
     type: Number,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
};
</script>
