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

export const dashboardTagColor: Record<DashboardTag, string> = {
  [DashboardTag.Layer2]: "pink",
  [DashboardTag.General]: "cyan",
  [DashboardTag.EcosystemHealth]: "green",
  [DashboardTag.Staking]: "red",
  [DashboardTag.MonetaryPolicy]: "yellow",
  [DashboardTag.DeFi]: "teal",
  [DashboardTag.MEV]: "blue",
  [DashboardTag.DuneAnalytics]: "purple",
  [DashboardTag.NFTs]: "pink",
  [DashboardTag.AccountAbstraction]: "orange",
};

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
