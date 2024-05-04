import { ClockIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import {
  PiArrowsLeftRightLight,
  PiGasPumpLight,
  PiWalletLight,
} from "react-icons/pi";
import { SiDatabricks } from "react-icons/si";

import { StatsCard } from "../stats/stats-card";

import { ChainStats } from "@/server";

export interface ChainStatsCardsProps {
  stats: ChainStats;
}

export const ChainStatsCard: FC<ChainStatsCardsProps> = ({
  stats: {
    total_blocks,
    average_block_time,
    total_addresses,
    total_transactions,
    gas_prices,
  },
}) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {total_blocks && (
      <StatsCard
        title="Total Blocks"
        value={total_blocks.toLocaleString()}
        subtitle="Total Blocks Mined"
        icon={<SiDatabricks />}
      />
    )}
    {average_block_time && (
      <StatsCard
        title="Block Time"
        value={`${average_block_time / 1000} s`}
        subtitle="Average time between blocks"
        icon={<ClockIcon />}
      />
    )}
    {total_transactions && (
      <StatsCard
        title="Total Transactions"
        value={total_transactions.toLocaleString()}
        subtitle="Total transactions"
        icon={<PiArrowsLeftRightLight />}
      />
    )}
    {total_addresses && (
      <StatsCard
        title="Total Addresses"
        value={total_addresses.toLocaleString()}
        subtitle="Total addresses"
        icon={<PiWalletLight />}
      />
    )}
    {gas_prices && (
      <StatsCard
        title="Gas Price (gwei)"
        icon={<PiGasPumpLight />}
        value={
          <div className="flex flex-row gap-2 justify-between font-normal">
            <div className="flex flex-col gap-2 items-center">
              <div className="text-2xl font-bold">{gas_prices.slow}</div>
              <p className="text-xs text-muted-foreground">Slow</p>
            </div>

            <div className="flex flex-col gap-2 items-center text-green-500">
              <div className="text-2xl font-bold">{gas_prices.average}</div>
              <p className="text-xs ">Average</p>
            </div>

            <div className="flex flex-col gap-2 items-center text-red-500">
              <div className="text-2xl font-bold">{gas_prices.fast}</div>
              <p className="text-xs ">Fast</p>
            </div>
          </div>
        }
      />
    )}
  </div>
);
