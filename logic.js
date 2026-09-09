export function calculateTotals(players, rounds) {
  let totals = players.map(() => 0);
  rounds.forEach(round => {
    round.forEach((score, i) => totals[i] += score);
  });
  return totals;
}

export function evaluateGame(players, rounds, target) {
  const totals = calculateTotals(players, rounds);
  const maxTotal = totals.length ? Math.max(...totals) : 0;
  const isFinished = maxTotal >= target && rounds.length > 0;
  
  const winners = isFinished 
    ? players.filter((_, i) => totals[i] === maxTotal) 
    : [];

  return { totals, maxTotal, isFinished, winners };
}