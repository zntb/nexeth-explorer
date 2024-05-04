import { procedure, router } from "../router-procedures";
import {
  getChainStatsRequestSchema,
  getChainStatsResponseSchema,
  getChainsResponseSchema,
  getGlobalStatsRequestSchema,
  getGlobalStatsResponseSchema,
} from "../schema/chain.schema";

import {
  BlockscoutService,
  EthereumPriceService,
  slugToChain,
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

  getGlobalStats: procedure
    .input(getGlobalStatsRequestSchema)
    .output(getGlobalStatsResponseSchema)
    .query(async ({ input }) => {
      const { chain } = input;

      const ethPriceService = new EthereumPriceService();
      const gasPrice = await ethPriceService.getGasPrice(chain);
      const ethPrice = await ethPriceService.getEthPrice();

      return { gasPrice, ethPrice };
    }),

  getChainStats: procedure
    .input(getChainStatsRequestSchema)
    .output(getChainStatsResponseSchema)
    .query(async ({ input }) => {
      const chain = slugToChain(input.chain);
      const blockscoutService = new BlockscoutService(chain);
      const stats = await blockscoutService.getChainStats();

      return { stats };
    }),
});
