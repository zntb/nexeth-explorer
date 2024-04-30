import { FaEthereum, FaGasPump } from "react-icons/fa";

import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import Typography from "../ui/typography";

import { trpc } from "@/server";

export const EthPrice = () => {
  const { data = { gasPrice: 0, ethPrice: { usd: 0 } }, isLoading } =
    trpc.chains.getNetworkStats.useQuery({
      chain: "ethereum",
    });

  return (
    <Card>
      <div className="flex gap-2 items-center px-2">
        <div className="flex gap-1 items-center">
          <FaGasPump opacity={0.5} size={10} />
          {isLoading ? (
            <Skeleton className="w-10 h-4" />
          ) : (
            <Typography effect="tiny">{data.gasPrice} gwei</Typography>
          )}
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex gap-1 items-center">
          <FaEthereum opacity={0.5} size={10} />

          {isLoading ? (
            <Skeleton className="w-10 h-4" />
          ) : (
            <Typography effect="tiny">${data.ethPrice.usd}</Typography>
          )}
        </div>
      </div>
    </Card>
  );
};
