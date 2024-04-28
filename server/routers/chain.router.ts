import { procedure, router } from "../router-procedures";
import { getChainsResponseSchema } from "../schema/chain.schema";

import { supportedChains, supportedTestnets } from "@/lib";

export const chainRouter = router({
  getChains: procedure.output(getChainsResponseSchema).query(() =>
    getChainsResponseSchema.parse({
      chains: supportedChains,
      testnets: supportedTestnets,
    })
  ),
});
