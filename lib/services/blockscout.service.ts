import { Chain, ChainSlug } from "@thirdweb-dev/chains";

import { ChainStats, chainStatsSchema } from "@/server";

export class BlockscoutService {
  constructor(private readonly chain: Chain) {}

  async getChainStats(): Promise<ChainStats> {
    return fetch(`${this.getUrl()}/api/v2/stats`)
      .then((res) => res.json())
      .then(chainStatsSchema.parse);
  }

  private getUrl(): string {
    const url = blockscoutUrlMap[this.chain.slug as ChainSlug];
    if (!url) {
      throw new Error(`Unsupported Blockscout Chain: ${this.chain.slug}`);
    }
    return url;
  }
}

const blockscoutUrlMap: Partial<Record<ChainSlug, string>> = {
  ethereum: "https://eth.blockscout.com",
  optimism: "https://optimism.blockscout.com",
  arbitrum: "https://arbitrum.blockscout.com",
  base: "https://base.blockscout.com",
  polygon: "https://polygon.blockscout.com",
  "polygon-zkevm": "https://zkevm.blockscout.com",
  sepolia: "https://eth-sepolia.blockscout.com",
  holesky: "https://eth-holesky.blockscout.com",
  "base-sepolia-testnet": "https://base-sepolia.blockscout.com",
  "op-sepolia-testnet": "https://optimism-sepolia.blockscout.com",
};
