import { isEnsName, resolveEns } from "@thirdweb-dev/react";
import { isAddress } from "ethers/lib/utils";

import { procedure, router } from "../router-procedures";
import {
  SearchItem,
  searchRequestSchema,
  searchResponseSchema,
} from "../schema";

import {
  createExplorerUrl,
  createTransactionLink,
  detectContractChains,
  detectTxChain,
  getIpfsHash,
  isIpfsSearch,
  isTransactionHash,
  shortenString,
  toTitleCase,
} from "@/lib";

export const searchRouter = router({
  get: procedure
    .input(searchRequestSchema)
    .output(searchResponseSchema)
    .query(async ({ input: { query } }) => {
      if (!query) {
        return { results: [] };
      }

      if (isTransactionHash(query)) {
        const chain = await detectTxChain(query);

        if (!chain) return { results: [] };

        const results: SearchItem[] = [
          {
            title: `${chain.name} Transaction: ${shortenString(query)}`,
            type: "transaction",
            href: createTransactionLink({ chain, hash: query }),
            chain: chain.slug,
          },
        ];

        const explorer = chain.explorers?.[0];

        if (explorer) {
          results.push({
            title: `${chain.name} Transaction: ${shortenString(
              query
            )} (${toTitleCase(explorer.name)})`,
            type: "transaction",
            href: createExplorerUrl({ explorer, type: "tx", location: query }),
            external: true,
            chain: chain.slug,
          });
        }

        return { results };
      }

      let ensName: string | undefined = undefined;

      if (isEnsName(query)) {
        const resolvedEns = await resolveEns(query);
        if (!resolvedEns) {
          return { results: [] };
        }
        ensName = query;
        query = resolvedEns;
      }

      if (isAddress(query)) {
        const chains = await detectContractChains(query);

        if (!chains || chains.length === 0) {
          return {
            results: [
              {
                title: `Address:${
                  ensName ? ` (${ensName})` : ""
                } ${shortenString(query)}`,
                type: "address",
                href: `/address/all/${query}`,
              },
            ],
          };
        }

        const results: SearchItem[] = [];

        chains.map((chain) => {
          results.push({
            title: `${chain.name} Contract:${
              ensName ? ` (${ensName})` : ""
            } ${shortenString(query)}`,
            type: "contract",
            href: `/address/${chain.slug}/${query}`,
            chain: chain.slug,
          });

          const explorer = chain.explorers?.[0];

          if (explorer) {
            results.push({
              title: `${chain.name} Contract:${
                ensName ? ` (${ensName})` : ""
              } ${shortenString(query)} (${toTitleCase(explorer.name)})`,
              type: "contract",
              href: createExplorerUrl({
                explorer,
                type: "address",
                location: query,
              }),
              external: true,
              chain: chain.slug,
            });
          }
        });

        return { results };
      }

      if (isIpfsSearch(query)) {
        const ipfsQuery = getIpfsHash(query);

        return {
          results: [
            {
              title: `IPFS Hash: ${shortenString(ipfsQuery)}`,
              type: "ipfs",
              href: `/ipfs/${ipfsQuery}`,
            },
          ],
        };
      }

      return { results: [] };
    }),
});
