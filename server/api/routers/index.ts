// import { attestationRouter } from "./firebase/attestation";
import superjson from "superjson";
import { createRouter } from "./context";
import { workRouter } from "./firebase/work";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("fs.work.", workRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
