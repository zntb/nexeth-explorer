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

export const chainGasSchema = z.object({
  average: z.number(),
  fast: z.number(),
  slow: z.number(),
});
export type ChainGas = z.infer<typeof chainGasSchema>;

export const chainStatsSchema = z.object({
  average_block_time: z.number(),
  coin_price: z.string().nullable(),
  coin_price_change_percentage: z.number().nullable(),
  gas_price_updated_at: z.string(),
  gas_prices: chainGasSchema,
  gas_prices_update_in: z.number(),
  gas_used_today: z.string(),
  market_cap: z.string(),
  network_utilization_percentage: z.number(),
  secondary_coin_price: z.string().nullable(),
  static_gas_price: z.string().nullable(),
  total_addresses: z.coerce.number(),
  total_blocks: z.coerce.number(),
  total_gas_used: z.string(),
  total_transactions: z.coerce.number(),
  transactions_today: z.string(),
  tvl: z.string().nullable(),
});
export type ChainStats = z.infer<typeof chainStatsSchema>;

export const chainTransactionChartSchema = z.object({
  chart_data: z.array(
    z.object({
      date: z.string(),
      tx_count: z.number(),
    })
  ),
});
export type ChainTransactionChart = z.infer<typeof chainTransactionChartSchema>;

export const chainMarketChartSchema = z.object({
  chart_data: z.array(
    z.object({
      date: z.string(),
      closing_price: z.string(),
      market_cap: z.string(),
      tvl: z.string().nullable(),
    })
  ),
});
export type ChainMarketChart = z.infer<typeof chainMarketChartSchema>;

export const getChainStatsRequestSchema = z.object({
  chain: z.string(),
});
export type GetChainStatsRequest = z.infer<typeof getChainStatsRequestSchema>;
export const getChainStatsResponseSchema = z.object({
  stats: chainStatsSchema,
  transactionChart: chainTransactionChartSchema,
  marketChart: chainMarketChartSchema,
});
export type GetChainStatsResponse = z.infer<typeof getChainStatsResponseSchema>;
