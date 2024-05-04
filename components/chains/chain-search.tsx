import { Chain } from "@thirdweb-dev/chains";
import { FC, useMemo, useState } from "react";

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
import { Switch } from "../ui/switch";
import Typography from "../ui/typography";

import { ChainCard } from "./chain-card";

type SortOption = "name-up" | "name-down" | "chainId-up" | "chainId-down";

export interface ChainSearchProps {
  chains: Chain[];
  testnets: Chain[];
}

export const ChainSearch: FC<ChainSearchProps> = ({ chains, testnets }) => {
  const [search, setSearch] = useState("");
  const [includeTestnets, setIncludeTestnets] = useState(false);
  const [sort, setSort] = useState<SortOption>("name-up");

  const filteredDashboards = useMemo(
    () =>
      (includeTestnets ? chains.concat(testnets) : chains)
        .filter(
          (chain) =>
            chain.name.toLowerCase().includes(search.toLowerCase()) ||
            chain.slug.toLowerCase().includes(search.toLowerCase()) ||
            chain.shortName.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
          switch (sort) {
            case "name-up":
              return a.name.localeCompare(b.name);
            case "name-down":
              return b.name.localeCompare(a.name);
            case "chainId-up":
              return a.chainId - b.chainId;
            case "chainId-down":
              return b.chainId - a.chainId;
          }
        }),

    [chains, includeTestnets, search, sort, testnets]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <Input
          placeholder="🔍 Search Chains"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-row items-center gap-2 w-full md:w-auto">
          <Select
            onValueChange={(s) => setSort(s as SortOption)}
            defaultValue="name-up"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Dashboard Category</SelectLabel>
                <SelectItem value="name-up">Name (A-Z)</SelectItem>
                <SelectItem value="name-down">Name (Z-A)</SelectItem>
                <SelectItem value="chainId-up">Chain ID (Low-High)</SelectItem>
                <SelectItem value="chainId-down">
                  Chain ID (High-Low)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Switch
            checked={includeTestnets}
            onCheckedChange={setIncludeTestnets}
          />

          <Typography effect="muted" className="font-light">
            Testnets
          </Typography>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredDashboards.map((chain) => (
          <ChainCard key={chain.chainId} chain={chain} />
        ))}
      </div>
    </div>
  );
};
