import { Chain } from "@thirdweb-dev/chains";
import { z } from "zod";

export const getChainsResponseSchema = z.object({
  chains: z.array(z.custom<Chain>()),
  testnets: z.array(z.custom<Chain>()),
});
export type GetChainsResponse = z.infer<typeof getChainsResponseSchema>;

export const getGlobalStatsRequestSchema = z.object({
  chain: z.string(),
});
export type GetGlobalStatsRequest = z.infer<typeof getGlobalStatsRequestSchema>;

export const ethPriceSchema = z.object({
  usd: z.number(),
});
export type EthPrice = z.infer<typeof ethPriceSchema>;

export const getGlobalStatsResponseSchema = z.object({
  gasPrice: z.number(),
  ethPrice: ethPriceSchema,
});
export type GetGlobalStatsResponse = z.infer<
  typeof getGlobalStatsResponseSchema
>;

export const chainStatsSchema = z.object({
  average_block_time: z.number(),
  coin_price: z.string().nullable(),
  coin_price_change_percentage: z.number().nullable(),
  gas_price_updated_at: z.string(),
  gas_prices: z.object({
    average: z.number(),
    fast: z.number(),
    slow: z.number(),
  }),
  gas_prices_update_in: z.number(),
  gas_used_today: z.string(),
  market_cap: z.string(),
  network_utilization_percentage: z.number(),
  secondary_coin_price: z.string().nullable(),
  static_gas_price: z.string().nullable(),
  total_addresses: z.string(),
  total_blocks: z.string(),
  total_gas_used: z.string(),
  total_transactions: z.string(),
  transactions_today: z.string(),
  tvl: z.string().nullable(),
});
export type ChainStats = z.infer<typeof chainStatsSchema>;

export const getChainStatsRequestSchema = z.object({
  chain: z.string(),
});
export type GetChainStatsRequest = z.infer<typeof getChainStatsRequestSchema>;
export const getChainStatsResponseSchema = z.object({
  stats: chainStatsSchema,
});
export type GetChainStatsResponse = z.infer<typeof getChainStatsResponseSchema>;
