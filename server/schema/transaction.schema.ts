import { Block as EthersBlock } from "@ethersproject/abstract-provider";
import { Transaction } from "ethers";
import { z } from "zod";

export const blockSchema = z.custom<EthersBlock>();
export type Block = z.infer<typeof blockSchema>;

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