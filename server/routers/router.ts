import { router } from "../router-procedures";

import { chainRouter } from "./chain.router";
import { dashboardRouter } from "./dashboard.router";
import { healthRouter } from "./health.router";
import { userRouter } from "./user.router";

export const appRouter = router({
  health: healthRouter,
  user: userRouter,
  dashboard: dashboardRouter,
  chains: chainRouter,
});

export type AppRouter = typeof appRouter;
