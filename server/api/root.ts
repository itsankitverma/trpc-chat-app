import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { hiRouter } from "./routers/hi";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  hi: hiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
