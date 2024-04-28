/**
 * Shortens @param address to length based on lead and trail length including ellipsis separation
 * {lead length}...{trail length}
 */
export const shortenString = (
  str?: string,
  leadLength = 8,
  trailLength = 5,
  maxLength = 20,
): string => {
  if (!str) return "";
  if (str.length <= maxLength) return str;

  if (str.length <= leadLength + trailLength) {
    return str;
  }

  return `${str.slice(0, leadLength)}...${str.slice(str.length - trailLength, str.length)}`;
};
