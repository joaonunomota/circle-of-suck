<template>
  <simple-dropdown
    v-if="competition"
    v-model="competition"
    class="dropdown-spacing"
    :options="competitions"
  />
  <simple-dropdown
    v-if="season"
    v-model="season"
    class="dropdown-spacing"
    :disabled="seasons.length <= 1"
    :options="seasons"
  />
  <fixture-table
    v-if="fixtures && fixtures.length > 0"
    class="center"
    :fixtures="fixtures"
    :teams="teams"
  />
  <p>{{ disclaimer }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FixtureTable, SimpleDropdown } from "./components";
import { competitions, seasons } from "./data";
import type { Competition, Fixture, Option, Team } from "./types";
import { toOption } from "./utils";

export default defineComponent({
  name: "App",
  components: {
    FixtureTable,
    SimpleDropdown
  },
  data: function () {
    return {
      competition: null as number | null,
      competitions: competitions,
      fixtures: [] as Fixture[],
      loading: false,
      season: null as number | null,
      seasons: [] as Option<number>[],
      teams: [] as Team[]
    };
  },
  computed: {
    disclaimer: function () {
      return this.fixtures.length > 0
        ? "Football data provided by the Football-Data.org API"
        : "DATA NOT FOUND";
    }
  },
  watch: {
    competition: async function (competition: number | null) {
      if (!competition) return;

      this.seasons = competition ? seasons[competition].map((s) => toOption(s)) : [];

      if (this.seasons.some((s) => s.value === this.season)) {
        await this.load(competition, this.season as number);
      } else if (this.seasons.length > 0) {
        this.season = this.seasons[this.seasons.length - 1].value;
      }
    },
    season: async function (season: number | null) {
      if (!season) return;

      await this.load(this.competition as number, season);
    }
  },
  methods: {
    load: async function (competition: number, season: number) {
      try {
        this.loading = true;

        const response: Competition = await import(`./data/${competition}-${season}.json`);

        this.teams = response.teams;
        this.fixtures = response.fixtures;
      } catch (error) {
        this.loading = false;

        this.teams = [];
        this.fixtures = [];
      }
    }
  },
  created: async function () {
    this.competition = this.competitions.length > 0 ? this.competitions[0].value : null;
    this.season = this.seasons.length > 0 ? this.seasons[0].value : null;

    if (this.competition && this.season) {
      await this.load(this.competition, this.season);
    }
  }
});
</script>

<style scoped>
.dropdown-spacing {
  margin: 0 1em 1.5em 1em;
}

.center {
  margin: auto;
}
</style>
