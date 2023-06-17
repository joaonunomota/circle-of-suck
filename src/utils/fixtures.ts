export const parseFixtures = function(json) {
  return Object.values(json).flatMap(({ competition, matches }) =>
    matches.map((match) => ({
      away: {
        id: match.awayTeam.id,
        name: match.awayTeam.shortName,
        score: match.score.fullTime.away,
      },
      competitionId: competition.id,
      home: {
        id: match.homeTeam.id,
        name: match.homeTeam.shortName,
        score: match.score.fullTime.home,
      },
    }))
  );
};
