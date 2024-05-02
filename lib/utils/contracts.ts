import { Chain } from "@thirdweb-dev/chains";
import { ChainOrRpcUrl, getChainProvider } from "@thirdweb-dev/sdk";

import { supportedChainsAndTestnets } from "../constants";

export const isChainContract = async (
  address: string,
  chain: ChainOrRpcUrl
) => {
  const client = getChainProvider(chain, {});
  const code = await client.getCode(address);
  return code && code !== "0x";
};

export const detectContractChains = async (address: string) =>
  (await Promise.all(
    supportedChainsAndTestnets.map(async (chain) => {
      try {
        return (await isChainContract(address, chain.chainId))
          ? chain
          : undefined;
      } catch (e) {
        return undefined;
      }
    })
  ).then((c) => c.filter(Boolean))) as Chain[];
