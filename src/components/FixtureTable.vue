<template>
  <table class="table">
    <thead>
      <tr>
        <th class="no-border" :colspan="2" :rowspan="2"></th>
        <th :colspan="teams.length">AWAY</th>
      </tr>
      <tr>
        <th v-for="away of teams" :key="away">{{ away }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(home, index) of teams" :key="home">
        <th v-if="index === 0" class="no-border row-header" :rowspan="teams.length">
          <div class="row-header-text">HOME</div>
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
      default: () => [],
    },
  },
  computed: {
    teams: function() {
      return this.fixtures
        .flatMap((fixture) => [fixture.home, fixture.away])
        .reduce(this.distinct, []);
    },
  },
  methods: {
    distinct: function(acc, curr, index, src) {
      return src.indexOf(curr) === index ? [...acc, curr] : acc;
    },
    result: function(home, away) {
      const results = this.fixtures.filter(
        (f) => f.home === home && f.away === away
      );

      if (results.length > 0 && results[0]) {
        const fixture = results[0];

        return `${fixture.homeScore} - ${fixture.awayScore}`;
      }
    },
  },
};
</script>

<style scoped>
.table {
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.row-header {
  vertical-align: middle;
}

.row-header-text {
  transform: translateY(50%) rotate(-90deg);
  width: 1em;
}

.no-border {
  border: none;
}
</style>
