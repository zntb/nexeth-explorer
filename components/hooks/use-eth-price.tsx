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
