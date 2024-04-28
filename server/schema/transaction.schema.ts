import { Transaction } from "ethers";
import { z } from "zod";

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
