import { router } from "../router-procedures";

import { chainRouter } from "./chain.router";
import { dashboardRouter } from "./dashboard.router";
import { healthRouter } from "./health.router";
import { transactionRouter } from "./transaction.router";
import { userRouter } from "./user.router";

export const appRouter = router({
  health: healthRouter,
  user: userRouter,
  dashboard: dashboardRouter,
  chains: chainRouter,
  transaction: transactionRouter,
});

export type AppRouter = typeof appRouter;
