import { trpc } from "@/server";

export const useEthPrice = () =>
  trpc.chains.getNetworkStats.useQuery(
    { chain: "ethereum" },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
