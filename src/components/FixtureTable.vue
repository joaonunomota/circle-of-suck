<template>
  <table v-if="teams" class="table">
    <thead>
      <tr>
        <th class="no-border" :colspan="2" :rowspan="2"></th>
        <th class="no-border has-text-centered" :colspan="teams.length">AWAY</th>
      </tr>
      <tr>
        <th v-for="away of teams" class="table-column vertical-header" :key="away">
          <div class="header-top vertical-header-inner">{{ away }}</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(home, index) of teams" :key="home">
        <th v-if="index === 0" class="no-border table-row vertical-header" :rowspan="teams.length">
          <div class="header-left vertical-header-inner">HOME</div>
        </th>
        <th>{{ home }}</th>
        <td v-for="away of teams" :key="away">
          {{ result(home, away) }}
        </td>
        <th>{{ home }}</th>
        <th v-if="index === 0" class="no-border table-row vertical-header" :rowspan="teams.length">
          <div class="header-right vertical-header-inner">HOME</div>
        </th>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th class="no-border" :colspan="2" :rowspan="2"></th>
        <th v-for="away of teams" class="table-column vertical-header" :key="away">
          <div class="header-bottom vertical-header-inner">{{ away }}</div>
        </th>
      </tr>
      <tr>
        <th class="no-border has-text-centered" :colspan="teams.length">AWAY</th>
      </tr>
    </tfoot>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { Match } from "../types";

export default defineComponent({
  name: "fixture-table",
  props: {
    competition: {
      type: Number
    },
    fixtures: {
      type: Array as PropType<Array<Match>>,
      default: () => []
    }
  },
  computed: {
    teams: function () {
      let fixtures = this.fixtures
        .filter((fixture) => fixture.competitionId === this.competition)
        .flatMap((fixture) => [fixture.home.name, fixture.away.name])
        .reduce(this.distinct, []);

      fixtures.sort();

      return fixtures;
    }
  },
  methods: {
    distinct: function (acc: Match[], curr: Match, index: number, src: Match[]) {
      return src.indexOf(curr) === index ? [...acc, curr] : acc;
    },
    result: function (home: string, away: string) {
      const results = this.fixtures.filter(
        // eslint-disable-next-line
        (f) => f.home.name === home && f.away.name === away
      );

      if (results.length > 0 && results[0]) {
        const fixture = results[0];

        return `${fixture.home.score} - ${fixture.away.score}`;
      }
    }
  }
});
</script>

<style scoped>
.no-border {
  border: none;
}

.vertical-header {
  vertical-align: middle;
}

.table-column.vertical-header {
  height: 9em;
}

.vertical-header-inner {
  white-space: nowrap;
  width: 1em;
}

.table-column .header-top.vertical-header-inner {
  transform: translate(50%, 150%) rotate(-45deg);
}

.table-column .header-bottom.vertical-header-inner {
  transform: translate(50%, -150%) rotate(45deg);
}

.table-row .header-left.vertical-header-inner {
  transform: translateY(50%) rotate(-90deg);
}

.table-row .header-right.vertical-header-inner {
  transform: translateY(-50%) rotate(90deg);
}
</style>
