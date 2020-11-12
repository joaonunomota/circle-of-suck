<template>
  <img alt="Football" class="sport-icon" src="./assets/football.svg" />
  <fixture-table class="center" :fixtures="fixtures" />
</template>

<script>
import FixtureTable from "./components/FixtureTable";

export default {
  name: "App",
  components: {
    FixtureTable
  },
  data: () => ({
    fixtures: []
  })
};
</script>

<style scoped>
.sport-icon {
  height: 20em;
  margin: 60px 0 60px 0;
}

.center {
  margin: auto;
}
</style>
