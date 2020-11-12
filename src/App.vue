<template>
  <fixture-table
    v-if="fixtures.length > 0"
    class="center"
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
import FixtureTable from "./components/FixtureTable";
import primeiraLiga from "./json/primeiraLiga.json";
import { teams } from "./utils/teams";

export default {
  name: "App",
  components: {
    FixtureTable
  },
  data: () => ({
    fixtures: primeiraLiga.matches.map((match) => ({
      away: {
        id: match.awayTeam.id,
        name: teams[match.awayTeam.id],
        score: match.score.fullTime.awayTeam
      },
      home: {
        id: match.homeTeam.id,
        name: teams[match.homeTeam.id],
        score: match.score.fullTime.homeTeam
      }
    }))
  })
};
</script>

<style scoped>
.sport-icon {
  height: 10em;
}

.center {
  margin: auto;
}
</style>
