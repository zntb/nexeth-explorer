export const formatBigNumber = (value: string, dp?: number) => {
  if (!dp) return value;

  const [leading, trailing] = value.split(".");

  if (trailing.length < dp) return `${leading}.${trailing.padEnd(dp, "0")}`;
  if (trailing.length > dp) return `${leading}.${trailing.slice(0, dp)}`;
  return `${leading}.${trailing}`;
};
