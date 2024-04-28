import { FC, PropsWithChildren } from "react";
import { ClassNameValue } from "tailwind-merge";

import { CommandPalette } from "../command-palette";
import { Header } from "../navigation";
import Typography from "../ui/typography";

import { BreadCrumbProps, PageBreadcrumbs } from "./page-breadcrumbs";

import { cn } from "@/lib";

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
  className?: ClassNameValue;
  title?: string;
  description?: string;
  showBreadcrumbs?: boolean;
  breadcrumbs?: BreadCrumbProps[];
}

export const PageContainer: FC<PropsWithChildren<PageContainerProps>> = ({
  className,
  children,
  title,
  description,
  showBreadcrumbs = true,
  breadcrumbs,
}) => (
  <div
    className={cn("flex flex-col gap-4 w-full max-w-6xl px-4 pt-20", className)}
  >
    {showBreadcrumbs && <PageBreadcrumbs breadcrumbs={breadcrumbs} />}

    {title && <Typography variant="h1">{title}</Typography>}
    {description && (
      <Typography variant="p" effect="muted">
        {description}
      </Typography>
    )}

    <CommandPalette />

    {children}
  </div>
);
