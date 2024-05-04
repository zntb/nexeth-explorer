import { ChainOrRpcUrl, getChainProvider } from "@thirdweb-dev/sdk";

import { RedisService } from "./redis.service";

import { EthPrice, ethPriceSchema } from "@/server";

const ETH_PRICE_KEY = "eth-price";
const ETH_PRICE_EXPIRATION = 60 * 10; // 10 minutes

export class EthereumPriceService {
  constructor(private redisService: RedisService = new RedisService()) {}

  async getEthPrice(): Promise<EthPrice> {
    const cachedPrice = await this.redisService.get(ETH_PRICE_KEY);

    if (cachedPrice) {
      return ethPriceSchema.parse(cachedPrice);
    }

    const ethPrice = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    )
      .then((res) => res.json())
      .then((res) => res.ethereum)
      .then(ethPriceSchema.parse);

    await this.redisService.set(ETH_PRICE_KEY, JSON.stringify(ethPrice), {
      ex: ETH_PRICE_EXPIRATION,
    });

    return ethPrice;
  }

  async getGasPrice(chain: ChainOrRpcUrl): Promise<number> {
    const provider = getChainProvider(chain, {});
    return (await provider.getGasPrice()).div(1e9).toNumber();
  }
}
