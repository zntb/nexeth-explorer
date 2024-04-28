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
  ImmutableZkevm,
  ImmutableZkevmTestnet,
} from "@thirdweb-dev/chains";

import { procedure, router } from "../router-procedures";
import { getChainsResponseSchema } from "../schema/chain.schema";

export const chainRouter = router({
  getChains: procedure.output(getChainsResponseSchema).query(() =>
    getChainsResponseSchema.parse({
      chains: [
        Ethereum,
        Optimism,
        Arbitrum,
        Base,
        Polygon,
        PolygonZkevm,
        ImmutableZkevm,
      ],
      testnets: [
        Sepolia,
        Holesky,
        PolygonAmoyTestnet,
        ImmutableZkevmTestnet,
        OpSepoliaTestnet,
        BaseSepoliaTestnet,
      ],
    })
  ),
});
