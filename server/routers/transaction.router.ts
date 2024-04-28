import { getChainProvider } from "@thirdweb-dev/sdk";

import { procedure, router } from "../router-procedures";
import {
  getBlockRequestSchema,
  getBlockResponseSchema,
  getTransactionRequestSchema,
  getTransactionResponseSchema,
} from "../schema";

export const transactionRouter = router({
  getTransaction: procedure
    .input(getTransactionRequestSchema)
    .output(getTransactionResponseSchema)
    .query(async ({ input }) => {
      const provider = getChainProvider(input.chain, {});

      const transaction = await provider.getTransaction(input.tx);
      return { transaction };
    }),

  getBlock: procedure
    .input(getBlockRequestSchema)
    .output(getBlockResponseSchema)
    .query(async ({ input }) => {
      const provider = getChainProvider(input.chain, {});

      const block = await provider.getBlock(input.blockNumber);
      return { block };
    }),
});
