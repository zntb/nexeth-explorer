import { router } from "../router-procedures";

import { dashboardRouter } from "./dashboard.router";
import { healthRouter } from "./health.router";
import { userRouter } from "./user.router";

export const appRouter = router({
  health: healthRouter,
  user: userRouter,
  dashboard: dashboardRouter,
});

export type AppRouter = typeof appRouter;
