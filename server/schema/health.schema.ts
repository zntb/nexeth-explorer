import { z } from "zod";

export const getHealthResponseSchema = z.object({
  /**
   * The health status of the server
   */
  status: z.string(),
});

export type GetHealthResponse = z.infer<typeof getHealthResponseSchema>;
