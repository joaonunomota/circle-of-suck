import type ScoreTimeline from "./ScoreTimeline";
import type Team from "./Team";

export default interface Match {
  awayTeam: Team;
  homeTeam: Team;
  score: ScoreTimeline;
}
