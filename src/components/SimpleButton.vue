<template>
  <button class="button is-primary"><slot name="default"></slot></button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({ name: "SimpleButton" });
</script>

<style scoped>
.button {
  font-size: 1em;
}
</style>
