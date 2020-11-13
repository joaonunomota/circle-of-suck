<template>
  <table class="table">
    <thead>
      <tr>
        <th class="no-border" :colspan="2" :rowspan="2"></th>
        <th :colspan="teams.length">AWAY</th>
      </tr>
      <tr>
        <th
          v-for="away of teams"
          class="table-column vertical-header"
          :key="away"
        >
          <div class="vertical-header-inner">{{ away }}</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(home, index) of teams" :key="home">
        <th
          v-if="index === 0"
          class="no-border table-row vertical-header"
          :rowspan="teams.length"
        >
          <div class="vertical-header-inner">HOME</div>
        </th>
        <th>{{ home }}</th>
        <td v-for="away of teams.filter((away) => away !== team)" :key="away">
          {{ result(home, away) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "fixture-table",
  props: {
    fixtures: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    teams: function() {
      return this.fixtures
        .flatMap((fixture) => [fixture.home.name, fixture.away.name])
        .reduce(this.distinct, []);
    }
  },
  methods: {
    distinct: function(acc, curr, index, src) {
      return src.indexOf(curr) === index ? [...acc, curr] : acc;
    },
    result: function(home, away) {
      const results = this.fixtures.filter(
        (f) => f.home.name === home && f.away.name === away
      );

      if (results.length > 0 && results[0]) {
        const fixture = results[0];

        return `${fixture.home.score} - ${fixture.away.score}`;
      }
    }
  }
};
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

.table-column .vertical-header-inner {
  transform: translate(50%, 150%) rotate(-45deg);
}

.table-row .vertical-header-inner {
  transform: rotate(-90deg);
}
</style>