import { z } from "zod";

export const ipfsClientServerStatsSchema = z.object({
  data: z.array(
    z.object({
      name: z.string(),
      x: z.array(z.coerce.date()),
      y: z.array(z.number()),
    })
  ),
});
export type IpfsClientServerStats = z.infer<typeof ipfsClientServerStatsSchema>;

export const ipfsGatewayRequestsSchema = z.object({
  data: z.array(
    z.object({
      name: z.string(),
      x: z.array(z.coerce.date()),
      y: z.array(z.number()),
    })
  ),
});
export type IpfsGatewayRequests = z.infer<typeof ipfsGatewayRequestsSchema>;
