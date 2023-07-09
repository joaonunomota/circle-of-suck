import type Fixture from "./Fixture";
import type Team from "./Team";

export default interface Competition {
  id: number;
  name: string;
  season: number;
  teams: Team[];
  fixtures: Fixture[];
}
