import { Inter } from "next/font/google";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { FC, PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export const ThemeProvider: FC<PropsWithChildren> = ({
  children,
  ...props
}) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="light"
    enableSystem
    disableTransitionOnChange
    {...props}
  >
    <main className={`${inter.className}`}>{children}</main>
  </NextThemesProvider>
);
