import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { httpLink, splitLink } from "@trpc/react-query";
import SuperJSON from "superjson";

import { AppRouter } from "./routers/router";

import { VERCEL_URL } from "@/lib";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const trpc = createTRPCNext<AppRouter>({
  config(/* opts */) {
    return {
      transformer: SuperJSON,
      links: [
        splitLink({
          condition(op) {
            // check for context property `skipBatch`
            return op.context.skipBatch === true;
          },
          // when condition is true, use normal request
          true: httpLink({
            url: `${getBaseUrl()}/api/trpc`,
          }),
          // when condition is false, use batching
          false: httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
          }),
        }),
      ],
    };
  },
  overrides: {
    useMutation: {
      /**
       * This function is called whenever a `.useMutation` succeeds
       */
      async onSuccess(opts) {
        /**
         * @note that order here matters:
         * The order here allows route changes in `onSuccess` without
         * having a flash of content change whilst redirecting.
         */
        // Calls the `onSuccess` defined in the `useQuery()`-options:
        await opts.originalFn();
        // Invalidate all queries in the react-query cache:
        await opts.queryClient.invalidateQueries();
      },
    },
  },
});
