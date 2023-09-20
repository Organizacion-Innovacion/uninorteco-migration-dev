export function getSemesterName(period: string) {
  const year = period.slice(0, 4);
  const periodType = period.slice(4);
  const periodName = periodType === "10" ? "I" : "II";
  return `Semestre ${year}-${periodName}`;
}
