export const competitions = {
  2017: "Primeira Liga",
  2021: "Premier League",
};

export const parseCompetitions = function(json) {
  return Object.values(json).map(({ competition }) => ({
    id: competition.id,
    name: competitions[competition.id],
  }));
};
