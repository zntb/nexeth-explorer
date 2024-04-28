import { Chain } from "@thirdweb-dev/chains";
import { z } from "zod";

export const getChainsResponseSchema = z.object({
  chains: z.array(z.custom<Chain>()),
  testnets: z.array(z.custom<Chain>()),
});
export type GetChainsResponse = z.infer<typeof getChainsResponseSchema>;
