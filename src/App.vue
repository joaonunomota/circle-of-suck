<template>
  <section>
    <simple-dropdown
      v-if="competition"
      v-model="competition"
      class="input-spacing"
      :options="competitions"
    />
    <simple-dropdown
      v-if="season"
      v-model="season"
      class="input-spacing"
      :disabled="seasons.length <= 1"
      :options="seasons"
    />
    <simple-button class="input-spacing" @click="toggle">Toggle</simple-button>
  </section>
  <section class="is-flex-grow-1">
    <cycle-diagram v-if="showCycle" class="center" :cycle="cycle" />
    <fixture-table v-else class="center" :fixtures="fixtures" :teams="teams" />
  </section>
  <footer>
    <p>{{ disclaimer }}</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CycleDiagram, FixtureTable, SimpleButton, SimpleDropdown } from "./components";
import { competitions, seasons } from "./data";
import type { Competition, Fixture, Option, Team } from "./types";
import { toCycle, toOption } from "./utils";

export default defineComponent({
  name: "App",
  components: {
    CycleDiagram,
    FixtureTable,
    SimpleButton,
    SimpleDropdown
  },
  data: function () {
    return {
      competition: null as number | null,
      competitions: competitions,
      cycle: [] as Team[],
      fixtures: [] as Fixture[],
      loading: false,
      season: null as number | null,
      seasons: [] as Option<number>[],
      showCycle: false,
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

      this.seasons = seasons[competition]
        .map((s) => toOption(s))
        .sort((a, b) => (a.value < b.value ? 1 : -1));

      if (this.seasons.some((s) => s.value === this.season)) {
        await this.load(competition, this.season as number);
      } else if (this.seasons.length > 0) {
        this.season = this.seasons[0].value;
      }

      if (this.showCycle) {
        this.refreshCycle();
      }
    },
    season: async function (season: number | null) {
      if (!season) return;

      await this.load(this.competition as number, season);

      if (this.showCycle) {
        this.refreshCycle();
      }
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
    },
    toggle: function () {
      this.showCycle = !this.showCycle;

      if (this.showCycle) {
        this.refreshCycle();
      }
    },
    toTeam(id: number) {
      const team = this.teams.find((team) => team.id === id);
      return team || { id: id, shortName: id.toString(), tla: id.toString() };
    },
    refreshCycle: function () {
      this.cycle = toCycle(this.teams, this.fixtures)?.map(this.toTeam) || [];
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
.input-spacing {
  margin: 0 1em 1.5em 1em;
}

.center {
  margin: auto;
}
</style>
