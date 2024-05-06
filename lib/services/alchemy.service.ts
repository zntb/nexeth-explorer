import { ChainSlug } from "@thirdweb-dev/chains";
import { Alchemy, Network } from "alchemy-sdk";

import { ALCHEMY_API_KEY as apiKey } from "../constants";

export class AlchemyService {
  constructor(
    private readonly chain: string,
    public sdk = AlchemyService.createAlchemySdk(chain)
  ) {}

  private static createAlchemySdk(chain: string): Alchemy {
    const network = alchemyNetworkMap[chain as ChainSlug];
    if (!network) throw new Error(`Unsupported Alchemy Chain: ${chain}`);
    if (!apiKey) throw new Error(`Missing Alchemy API Key`);
    return new Alchemy({ network, apiKey });
  }
}

export const alchemyNetworkMap: Partial<Record<ChainSlug, Network>> = {
  ethereum: Network.ETH_MAINNET,
  optimism: Network.OPT_MAINNET,
  arbitrum: Network.ARB_MAINNET,
  base: Network.BASE_MAINNET,
  polygon: Network.MATIC_MAINNET,
  "polygon-zkevm": Network.POLYGONZKEVM_MAINNET,
  sepolia: Network.ETH_SEPOLIA,
  "base-sepolia-testnet": Network.BASE_SEPOLIA,
  "op-sepolia-testnet": Network.OPT_SEPOLIA,
};
