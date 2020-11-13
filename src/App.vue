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
import { competitions, teams } from "./utils";

export default {
  name: "App",
  components: {
    FixtureTable,
    VueDropdown,
  },
  computed: {
    competitions: function() {
      return Object.values(json).map(({ competition }) => ({
        id: competition.id,
        name: competitions[competition.id],
      }));
    },
    fixtures: function() {
      return Object.values(json).flatMap(({ competition, matches }) =>
        matches.map((match) => ({
          away: {
            id: match.awayTeam.id,
            name: teams[match.awayTeam.id] || match.awayTeam.name,
            score: match.score.fullTime.awayTeam,
          },
          competitionId: competition.id,
          home: {
            id: match.homeTeam.id,
            name: teams[match.homeTeam.id] || match.homeTeam.name,
            score: match.score.fullTime.homeTeam,
          },
        }))
      );
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
