<template>
  <div class="circle-container">
    <div
      v-for="(item, index) in interspersedItems"
      :key="index"
      :style="getCircleStyle(index)"
      class="circle"
    >
      <div class="content" :style="getContentStyle(index)">{{ item }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: "CycleDiagram",
  props: {
    cycle: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  computed: {
    interspersedItems: function () {
      return this.intersperse(this.cycle, ">");
    }
  },
  methods: {
    getCircleStyle: function (index: number) {
      const angle = (2 * Math.PI) / this.interspersedItems.length;

      const radius = 35;
      const translateX = radius * Math.cos(angle * index);
      const translateY = radius * Math.sin(angle * index);

      return {
        transform: `translate(calc(${translateX} * min(1vw, 1vh)), calc(${translateY} * min(1vw, 1vh)))`
      };
    },
    getContentStyle: function (index: number) {
      if (index % 2 === 0) {
        return {};
      }

      const angle = (2 * Math.PI) / this.interspersedItems.length;
      const rotate = (angle * index + Math.PI / 2) * (180 / Math.PI);

      return {
        transform: `rotate(${rotate}deg)`
      };
    },
    intersperse(array: string[], value: string) {
      if (array.length === 0) {
        return array;
      }

      const result = [];
      for (let i = 0; i < array.length; i++) {
        result.push(array[i], value);
      }

      return result;
    }
  }
});
</script>

<style scoped>
.circle-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.circle {
  position: absolute;
  overflow: visible;
}

.arrow {
  position: absolute;
  top: 50%;
}
</style>
