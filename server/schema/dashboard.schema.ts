import { z } from "zod";

export enum DashboardTag {
  Layer2 = "Layer 2s",
  General = "General Ethereum",
  EcosystemHealth = "Ecosystem Health",
  Staking = "Staking",
  MonetaryPolicy = "Monetary Policy",
  DeFi = "DeFi",
  MEV = "MEV",
  DuneAnalytics = "Dune Analytics",
  NFTs = "NFTs",
  AccountAbstraction = "Account Abstraction",
}

export const dashboardSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  url: z.string(),
  tags: z.array(z.string()),
});
export type Dashboard = z.infer<typeof dashboardSchema>;

export const getDashboardResponseSchema = z.object({
  dashboards: z.array(dashboardSchema),
});
export type GetDashboardResponse = z.infer<typeof getDashboardResponseSchema>;
