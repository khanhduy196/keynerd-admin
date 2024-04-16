export const getDisplayDate = (date: Date): string => {
  return date.toLocaleDateString(undefined, {
    dateStyle: "medium",
  });
};
