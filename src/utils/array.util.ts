export const sortAscBySequence = <T extends { sequence: number }>(
  arr: T[]
): T[] => {
  return [...arr].sort((a, b) => a.sequence - b.sequence);
};
