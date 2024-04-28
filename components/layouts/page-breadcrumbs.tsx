import { SlashIcon } from "@radix-ui/react-icons";
import last from "lodash/last";
import Link from "next/link";
import { FC } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadCrumbProps {
  name: string | number;
  href: string;
}

export interface PageBreadcrumbsProps {
  breadcrumbs?: BreadCrumbProps[];
}
export const PageBreadcrumbs: FC<PageBreadcrumbsProps> = ({
  breadcrumbs = [],
}) => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="/">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>

      {
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
      }

      {breadcrumbs.slice(0, -1).map(({ name, href }, index) => (
        <>
          <BreadcrumbItem key={index}>
            <BreadcrumbLink asChild>
              <Link href={href}>{name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
        </>
      ))}

      <BreadcrumbItem>
        <BreadcrumbPage>{last(breadcrumbs)?.name}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);
