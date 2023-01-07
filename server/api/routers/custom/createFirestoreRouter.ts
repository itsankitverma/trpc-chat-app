import { TRPCError } from "@trpc/server";
import * as trpc from "@trpc/server";
import { Context } from "../context";

export function createFirestoreRouter() {
  return trpc
    .router<Context>()
    .query("getSession", {
      resolve({ ctx }) {
        return ctx.session;
      },
    })
    .middleware(async ({ ctx, next }) => {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      if (!ctx.firestore) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Firestore not initialized",
        });
      }

      return next();
    });
}
