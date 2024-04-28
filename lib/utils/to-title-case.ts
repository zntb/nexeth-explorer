/**
 * Convert a string to title case
 *
 * @param str The string to convert
 * @returns The title case as a string
 */
export const toTitleCase = (str: string) =>
  str?.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
