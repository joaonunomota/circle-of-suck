export const competitions: Record<number, string> = {
  2017: "Primeira Liga",
  2021: "Premier League"
};

export const parseCompetitions = function (json: object) {
  return Object.values(json).map(({ competition }) => ({
    id: competition.id,
    name: competitions[competition.id]
  }));
};
