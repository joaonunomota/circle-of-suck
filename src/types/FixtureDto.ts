import type ScoreTimelineDto from "./ScoreTimelineDto";
import type TeamDto from "./TeamDto";

export default interface FixtureDto {
  awayTeam: TeamDto;
  homeTeam: TeamDto;
  score: ScoreTimelineDto;
}
