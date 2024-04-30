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
  // ImmutableZkevm,
  // ImmutableZkevmTestnet,
  Chain,
} from "@thirdweb-dev/chains";

export const supportedChains = [
  Ethereum,
  Optimism,
  Arbitrum,
  Base,
  Polygon,
  PolygonZkevm,
  // ImmutableZkevm,
] as Chain[];

export const supportedTestnets = [
  Sepolia,
  Holesky,
  PolygonAmoyTestnet,
  // ImmutableZkevmTestnet,
  OpSepoliaTestnet,
  BaseSepoliaTestnet,
] as Chain[];

export const supportedChainsAndTestnets =
  supportedChains.concat(supportedTestnets);
