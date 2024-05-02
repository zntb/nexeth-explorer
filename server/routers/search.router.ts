import { isAddress } from "ethers/lib/utils";

import { procedure, router } from "../router-procedures";
import { searchRequestSchema, searchResponseSchema } from "../schema";

import {
  createTransactionLink,
  detectContractChains,
  detectTxChain,
  isTransactionHash,
  shortenString,
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

        return {
          results: [
            {
              title: `${chain.name} Transaction: ${shortenString(query)}`,
              type: "transaction",
              href: createTransactionLink({ chain: chain.slug, hash: query }),
            },
          ],
        };
      }

      if (isAddress(query)) {
        const chains = await detectContractChains(query);

        if (!chains || chains.length === 0) {
          return {
            results: [
              {
                title: `Address: ${shortenString(query)}`,
                type: "address",
                href: `/address/all/${query}`,
              },
            ],
          };
        }

        return {
          results: chains.map((chain) => ({
            title: `${chain.name} Contract: ${shortenString(query)}`,
            type: "contract",
            href: `/address/${chain.slug}/${query}`,
          })),
        };
      }

      return { results: [] };
    }),
});
