import { FC, PropsWithChildren } from "react";

import { Header } from "../navigation";
import Typography from "../ui/typography";

export interface AppLayoutProps {}

export const AppLayout: FC<PropsWithChildren<AppLayoutProps>> = ({
  children,
}) => (
  <div className="flex min-h-screen flex-col items-center">
    <Header />
    {children}
  </div>
);

export interface PageContainerProps {
  title: string;
  description?: string;
}

export const PageContainer: FC<PropsWithChildren<PageContainerProps>> = ({
  children,
  title,
  description,
}) => (
  <div className="flex flex-col  gap-4 w-full max-w-[1024px] px-4 pt-20">
    <Typography variant="h1">{title}</Typography>
    {description && (
      <Typography variant="p" effect="muted">
        {description}
      </Typography>
    )}

    {children}
  </div>
);
