import { getChainProvider } from "@thirdweb-dev/sdk";

import { procedure, router } from "../router-procedures";
import {
  getChainsResponseSchema,
  getNetworkStatsRequestSchema,
  getNetworkStatsResponseSchema,
} from "../schema/chain.schema";

import { supportedChains, supportedTestnets } from "@/lib";

export const chainRouter = router({
  getChains: procedure.output(getChainsResponseSchema).query(() =>
    getChainsResponseSchema.parse({
      chains: supportedChains,
      testnets: supportedTestnets,
    })
  ),

  getNetworkStats: procedure
    .input(getNetworkStatsRequestSchema)
    .output(getNetworkStatsResponseSchema)
    .query(async ({ input }) => {
      const { chain } = input;

      const provider = getChainProvider(chain, {});
      const gasPrice = (await provider.getGasPrice()).div(1e9).toNumber();
      // const ethPrice = await fetch(
      //   "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      // )
      //   .then((res) => res.json())
      //   .then((res) => res.ethereum);
      const ethPrice = { usd: 2000.0 };

      return { gasPrice, ethPrice };
    }),
});
