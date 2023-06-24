import type Team from "./Team";

export default interface Fixture {
  away: Team;
  competitionId: number;
  home: Team;
}
