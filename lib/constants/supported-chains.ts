import {
  Ethereum,
  Sepolia,
  Holesky,
  Optimism,
  OpSepoliaTestnet,
  Arbitrum,
  Base,
  BaseSepoliaTestnet,
  Polygon,
  PolygonAmoyTestnet,
  PolygonZkevm,
  Chain,
} from "@thirdweb-dev/chains";

export const supportedChains = [
  Ethereum,
  Optimism,
  Arbitrum,
  Base,
  Polygon,
  PolygonZkevm,
] as Chain[];

export const supportedTestnets = [
  Sepolia,
  Holesky,
  PolygonAmoyTestnet,
  OpSepoliaTestnet,
  BaseSepoliaTestnet,
] as Chain[];

export const supportedChainsAndTestnets =
  supportedChains.concat(supportedTestnets);

export const slugToChain: Record<string, Chain> =
  supportedChainsAndTestnets.reduce((acc, chain) => {
    acc[chain.slug] = chain;
    return acc;
  }, {} as Record<string, Chain>);
