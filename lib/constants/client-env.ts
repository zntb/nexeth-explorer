export const THIRDWEB_CLIENT_ID = process.env
  .NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string;
export const WALLET_CONNECT_PROJECT_ID = process.env
  .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;
export const VERCEL_URL =
  (process.env.VERCEL_URL as string) ?? "http://localhost:3000";
export const MAINTENANCE_MODE =
  process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

export type Network = "mainnet" | "testnet";
export const NETWORK = process.env.NEXT_PUBLIC_NETWORK as Network;
