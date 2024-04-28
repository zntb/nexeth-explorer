import { procedure, router } from "../router-procedures";

import { getHealthResponseSchema } from "@/server";

export const healthRouter = router({
  /**
   * Get the health status of the server
   */
  getHealth: procedure.output(getHealthResponseSchema).query(() => ({
    status: "ok",
  })),
});
