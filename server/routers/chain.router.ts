import { getChainProvider } from "@thirdweb-dev/sdk";

import { procedure, router } from "../router-procedures";
import {
  getChainsResponseSchema,
  getNetworkStatsRequestSchema,
  getNetworkStatsResponseSchema,
} from "../schema/chain.schema";

import {
  EthereumPriceService,
  supportedChains,
  supportedTestnets,
} from "@/lib";

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

      const ethPriceService = new EthereumPriceService();
      const gasPrice = await ethPriceService.getGasPrice(chain);
      const ethPrice = await ethPriceService.getEthPrice();

      return { gasPrice, ethPrice };
    }),
});
