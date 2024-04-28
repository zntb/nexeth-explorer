import { useTheme } from "next-themes";

export const useColorModeValue = <T extends string>(light: T, dark: T): T => {
  const { theme } = useTheme();

  return theme === "dark" ? dark : light;
};
