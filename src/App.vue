<template>
  <vue-dropdown
    v-if="competitionId"
    v-model="competitionId"
    class="margin-bottom"
    :options="competitions"
  />
  <fixture-table
    v-if="fixtures && fixtures.length > 0"
    class="center"
    :competition="competitionId"
    :fixtures="fixtures"
  />
  <p>
    {{
      fixtures.length > 0
        ? "Football data provided by the Football-Data.org API"
        : "DATA NOT FOUND"
    }}
  </p>
</template>

<script>
import { FixtureTable, VueDropdown } from "./components";
import * as json from "./json";
import { parseCompetitions, parseFixtures } from "./utils";

export default {
  name: "App",
  components: {
    FixtureTable,
    VueDropdown,
  },
  computed: {
    competitions: function() {
      return parseCompetitions(json);
    },
    fixtures: function() {
      return parseFixtures(json);
    },
  },
  created: function() {
    this.competitionId =
      this.competitions.length > 0 ? this.competitions[0].id : undefined;
  },
  data: function() {
    return {
      competitionId: undefined,
    };
  },
};
</script>

<style scoped>
.margin-bottom {
  margin-bottom: 1.5em;
}

.center {
  margin: auto;
}
</style>
