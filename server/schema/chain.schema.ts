import { Chain } from "@thirdweb-dev/chains";
import { z } from "zod";

export const getChainsResponseSchema = z.object({
  chains: z.array(z.custom<Chain>()),
  testnets: z.array(z.custom<Chain>()),
});
export type GetChainsResponse = z.infer<typeof getChainsResponseSchema>;

export const getNetworkStatsRequestSchema = z.object({
  chain: z.string(),
});
export type GetNetworkStatsRequest = z.infer<
  typeof getNetworkStatsRequestSchema
>;
export const getNetworkStatsResponseSchema = z.object({
  gasPrice: z.number(),
  ethPrice: z.object({
    usd: z.number(),
  }),
});
export type GetNetworkStatsResponse = z.infer<
  typeof getNetworkStatsResponseSchema
>;
