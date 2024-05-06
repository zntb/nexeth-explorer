import { getBlock, getChainProvider } from "@thirdweb-dev/sdk";
import { AssetTransfersCategory, fromHex, toHex } from "alchemy-sdk";

import { procedure, router } from "../router-procedures";
import {
  LiteTransaction,
  getBlockRequestSchema,
  getBlockResponseSchema,
  getTransactionRequestSchema,
  getTransactionResponseSchema,
  getTransactionsRequestSchema,
  getTransactionsResponseSchema,
} from "../schema";

import { AlchemyService } from "@/lib";

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
      const block = await getBlock({
        network: input.chain,
        block: input.blockNumber,
      });

      const latestBlock = await getBlock({
        network: input.chain,
        block: "latest",
      });

      const { sdk } = new AlchemyService(input.chain);

      const transactions = await sdk.core
        .getTransactionReceipts({
          blockNumber: toHex(input.blockNumber),
        })
        .then((receipts) =>
          receipts.receipts?.map(
            (receipt): LiteTransaction => ({
              hash: receipt.transactionHash,
              blockNumber: input.blockNumber,
              from: receipt.from,
              to: receipt.to,
              type: receipt.type.toString(),
              token: undefined,
              value: undefined,
            })
          )
        );

      return { block, latestBlock, transactions: transactions || [] };
    }),

  getTransfers: procedure
    .input(getTransactionsRequestSchema)
    .output(getTransactionsResponseSchema)
    .query(async ({ input }) => {
      const { sdk } = new AlchemyService(input.chain);

      const category: AssetTransfersCategory[] = [
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.ERC1155,
        AssetTransfersCategory.ERC1155,
        AssetTransfersCategory.EXTERNAL,
      ];

      const [from, to] = await Promise.all([
        sdk.core.getAssetTransfers({
          fromAddress: input.address,
          category,
          maxCount: 1000,
        }),
        sdk.core.getAssetTransfers({ toAddress: input.address, category }),
      ]);

      const transactions = [...from.transfers, ...to.transfers]
        .sort((a, b) => fromHex(b.blockNum) - fromHex(a.blockNum))
        .map(
          (transfer): LiteTransaction => ({
            hash: transfer.hash,
            blockNumber: fromHex(transfer.blockNum),
            from: transfer.from || undefined,
            to: transfer.to || undefined,
            type: "transfer",
            token: transfer.category,
            value:
              (transfer.category === AssetTransfersCategory.EXTERNAL &&
                transfer.value) ||
              undefined,
          })
        );

      return { transactions };
    }),
});
