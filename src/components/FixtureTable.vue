<template>
  <table v-if="teams" class="table">
    <thead>
      <tr>
        <th class="no-border" :colspan="2" :rowspan="2"></th>
        <th class="no-border has-text-centered" :colspan="teams.length">AWAY</th>
      </tr>
      <tr>
        <th v-for="away of teams" class="table-column vertical-header" :key="away.id">
          <div class="header-top vertical-header-inner">{{ away.shortName }}</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(home, index) of teams" :key="home.id">
        <th v-if="index === 0" class="no-border table-row vertical-header" :rowspan="teams.length">
          <div class="header-left vertical-header-inner">HOME</div>
        </th>
        <th>{{ home.shortName }}</th>
        <td v-for="away of teams" :key="away.id">
          {{ result(home.id, away.id) }}
        </td>
        <th>{{ home.shortName }}</th>
        <th v-if="index === 0" class="no-border table-row vertical-header" :rowspan="teams.length">
          <div class="header-right vertical-header-inner">HOME</div>
        </th>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th class="no-border" :colspan="2" :rowspan="2"></th>
        <th v-for="away of teams" class="table-column vertical-header" :key="away.id">
          <div class="header-bottom vertical-header-inner">{{ away.shortName }}</div>
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
import type { Fixture, Team } from "../types";

export default defineComponent({
  name: "FixtureTable",
  props: {
    fixtures: {
      type: Array as PropType<Fixture[]>,
      default: () => []
    },
    teams: {
      type: Array as PropType<Team[]>,
      default: () => []
    }
  },
  methods: {
    result: function (home: number, away: number): string | null {
      const results = this.fixtures.filter((f) => f.homeTeam === home && f.awayTeam === away);

      if (results.length > 0 && results[0]) {
        const fixture = results[0];

        return `${fixture.homeScore} - ${fixture.awayScore}`;
      }

      return null;
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
