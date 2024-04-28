import { FC, useMemo } from "react";

import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import { Separator } from "../ui/separator";

import { DashboardCard } from "./dashboard-card";
import { useDashboardStore } from "./dashboard-store";

import { Dashboard, DashboardTag } from "@/server";

export interface DashboardSearchProps {
  dashboards: Dashboard[];
}

export const DashboardSearch: FC<DashboardSearchProps> = ({ dashboards }) => {
  const { category, setCategory, search, setSearch } = useDashboardStore();

  const filteredDashboards = useMemo(
    () =>
      dashboards.filter(
        (dashboard) =>
          (dashboard.name.toLowerCase().includes(search.toLowerCase()) ||
            dashboard.description
              .toLowerCase()
              .includes(search.toLowerCase())) &&
          (!category ||
            category === "all" ||
            dashboard.tags.includes(category as DashboardTag))
      ),
    [category, dashboards, search]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between gap-2">
        <Input
          placeholder="🔍 Search Dashboards"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Dashboard Category</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              {Object.values(DashboardTag).map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredDashboards.map((dashboard) => (
          <DashboardCard key={dashboard.name} dashboard={dashboard} />
        ))}
      </div>
    </div>
  );
};
