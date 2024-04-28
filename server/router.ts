import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import { AuthContext } from "./context/auth-context";
import { MaintenanceModeError, UnauthorizedError } from "./errors";

import { MAINTENANCE_MODE } from "@/lib";

const t = initTRPC.context<AuthContext>().create({
  transformer: superjson,
});

const maintenanceMode = t.middleware((opts) => {
  if (MAINTENANCE_MODE) throw MaintenanceModeError();

  return opts.next(opts);
});

const requireAuth = t.middleware((opts) => {
  const { ctx } = opts;
  if (!ctx.session) throw UnauthorizedError();

  return opts.next(opts);
});

const requestLogger = t.middleware((opts) => {
  console.log(`[${opts.type.toUpperCase()}] ${opts.path}`);
  return opts.next(opts);
});

export const { router } = t;
export const procedure = t.procedure.use(requestLogger).use(maintenanceMode);
export const protectedProcedure = procedure.use(requireAuth);
