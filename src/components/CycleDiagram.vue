<template>
  <div v-if="hasCycle" class="circle-container">
    <div
      v-for="(item, index) in interspersedItems"
      :key="index"
      :style="getCircleStyle(index)"
      class="circle"
    >
      <div class="content" :style="getContentStyle(index)">
        <span class="large">{{ item.shortName }}</span>
        <span class="small">{{ item.tla }}</span>
      </div>
    </div>
  </div>
  <div class="circle-container" v-else>no circle of suck :(</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { Team } from "../types";

export default defineComponent({
  name: "CycleDiagram",
  props: {
    cycle: {
      type: Array as PropType<Team[]>,
      required: true
    }
  },
  computed: {
    interspersedItems: function () {
      return this.intersperse(this.cycle, ">");
    },
    hasCycle: function () {
      return this.cycle.length > 0;
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
    intersperse(array: Team[], seperator: string) {
      if (array.length === 0) {
        return array;
      }

      const result = [];
      for (let i = 0; i < array.length; i++) {
        result.push(array[i], { id: -i, shortName: seperator, tla: seperator });
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

.content .small {
  display: none;
}

.content .large {
  display: inline;
}

@media (max-height: 40em) or (max-width: 40em) {
  .content .small {
    display: inline;
  }

  .content .large {
    display: none;
  }
}
</style>
