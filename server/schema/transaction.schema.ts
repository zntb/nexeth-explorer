import { Block as EthersBlock } from "@ethersproject/abstract-provider";
import { Transaction } from "ethers";
import { z } from "zod";

export const blockSchema = z.custom<EthersBlock>();
export type Block = z.infer<typeof blockSchema>;

export const liteTransactionSchema = z.object({
  hash: z.string(),
  blockNumber: z.number(),
  from: z.string().optional(),
  to: z.string().optional(),
  type: z.string(),
  token: z.string(),
  value: z.number().optional(),
});
export type LiteTransaction = z.infer<typeof liteTransactionSchema>;

export const getTransactionRequestSchema = z.object({
  chain: z.string(),
  tx: z.string(),
});
export type GetTransactionRequest = z.infer<typeof getTransactionRequestSchema>;

export const getTransactionResponseSchema = z.object({
  transaction: z.custom<Transaction>(),
});
export type GetTransactionResponse = z.infer<
  typeof getTransactionResponseSchema
>;

export const getBlockRequestSchema = z.object({
  chain: z.string(),
  blockNumber: z.coerce.number(),
});
export type GetBlockRequest = z.infer<typeof getBlockRequestSchema>;
export const getBlockResponseSchema = z.object({
  block: z.custom<EthersBlock>(),
  latestBlock: z.custom<EthersBlock>(),
});
export type GetBlockResponse = z.infer<typeof getBlockResponseSchema>;

export const getTransactionsRequestSchema = z.object({
  chain: z.string(),
  address: z.string(),
});
export type GetTransactionsRequest = z.infer<
  typeof getTransactionsRequestSchema
>;

export const getTransactionsResponseSchema = z.object({
  transactions: z.array(liteTransactionSchema),
});
export type GetTransactionsResponse = z.infer<
  typeof getTransactionsResponseSchema
>;
