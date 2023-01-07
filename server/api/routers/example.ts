import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userRef = ctx.firestore
        .collection("chat")
        .doc("102148689601115781018");

      const record = await userRef.get();

      const resume = record.data();
      return {
        resume,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  testMutate: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userRef = ctx.firestore.collection("chat").doc(input.id);

      await userRef.set(
        {
          id: input.id,
          name: ctx.session?.user.name,
        },
        {
          merge: true,
        }
      );
    }),
});
