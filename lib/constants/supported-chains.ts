import {
  Ethereum,
  Sepolia,
  Optimism,
  OpSepoliaTestnet,
  Arbitrum,
  Base,
  BaseSepoliaTestnet,
  Polygon,
  PolygonZkevm,
  Chain,
  getChainBySlug,
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
  OpSepoliaTestnet,
  BaseSepoliaTestnet,
] as Chain[];

export const supportedChainsAndTestnets =
  supportedChains.concat(supportedTestnets);

export const slugToChain = (slug: string) =>
  getChainBySlug(slug) ??
  supportedChainsAndTestnets.find((chain) => chain.slug === slug);
