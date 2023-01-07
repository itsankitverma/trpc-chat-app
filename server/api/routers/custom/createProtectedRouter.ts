import { TRPCError } from "@trpc/server";
import * as trpc from "@trpc/server";
import { Context } from "../context";

export function createProtectedRouter() {
  return trpc
    .router<Context>()
    .query("getSession", {
      resolve({ ctx }) {
        return ctx.session;
      },
    })
    .middleware(async ({ ctx, next }) => {
      // Any queries or mutations after this middleware will
      // raise an error unless there is a current session
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return next();
    });
}
