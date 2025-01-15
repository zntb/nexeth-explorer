import { getChainProvider } from '@thirdweb-dev/sdk';
import { formatEther } from 'ethers/lib/utils';

import { procedure, router } from '../router-procedures';
import {
  getAddressDetailsResponseSchema,
  getChainAddressRequestSchema,
} from '../schema';

import { isChainContract } from '@/lib';

export const addressRouter = router({
  getDetails: procedure
    .input(getChainAddressRequestSchema)
    .output(getAddressDetailsResponseSchema)
    .query(async ({ input }) => {
      const provider = getChainProvider(input.chain, {});
      const balance = await provider
        .getBalance(input.address)
        .then(formatEther);
      const isContract = await isChainContract(input.address, input.chain);

      return { balance, isContract };
    }),
});
