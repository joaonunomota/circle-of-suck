import { teams } from "./teams";

export const parseFixtures = function(json) {
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
};
