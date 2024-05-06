import { formatEther, parseEther } from "ethers/lib/utils";
import { useMemo } from "react";

import { formatBigNumber } from "@/lib";
import { trpc } from "@/server";

export const useEthPrice = () =>
  trpc.chains.getGlobalStats.useQuery(
    { chain: "ethereum" },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

export const useUsdPrice = (eth: string) => {
  const { data } = useEthPrice();
  const usdPrice = useMemo(() => {
    if (!data) return null;
    return formatBigNumber(
      formatEther(
        parseEther(eth)
          .mul(parseEther(data.ethPrice.usd.toString()))
          .div(parseEther("1"))
          .toString()
      ),
      2
    );
  }, [data, eth]);

  return {
    data: usdPrice,
    isLoading: !data,
  };
};
