import { getChainProvider } from "@thirdweb-dev/sdk";

import { supportedChainsAndTestnets } from "../constants";

export const isTransactionHash = (hash: string) => {
  const _hash = hash.trim();
  return _hash.length === 66 && _hash.startsWith("0x");
};

export const detectTxChainSequentially = async (hash: string) => {
  for (const chain of supportedChainsAndTestnets) {
    const client = getChainProvider(chain, {});
    try {
      const tx = await client.getTransaction(hash);
      if (tx) return chain;
    } catch (e) {
      // ignore
    }
  }

  return undefined;
};

export const detectTxChain = async (hash: string) => {
  const chain = await Promise.any(
    supportedChainsAndTestnets.map(async (chain) => {
      const client = getChainProvider(chain, {});
      try {
        const tx = await client.getTransaction(hash);
        return tx ? Promise.resolve(chain) : Promise.reject();
      } catch (e) {
        return Promise.reject();
      }
    })
  ).catch(() => undefined);

  return chain;
};
