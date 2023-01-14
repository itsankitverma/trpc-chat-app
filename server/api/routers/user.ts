import { z } from "zod";
import type { User, UserList } from "../../../data/model/UserInfo";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ handle: z.string() }))
    .query(async ({ ctx, input }) => {
      const handleRef = ctx.firestore.collection("username").doc(input.handle);
      const handleRecord = await handleRef.get();

      const targetHandle = handleRecord.data();

      const userRef = ctx.firestore
        .collection("chat")
        .doc(targetHandle?.userId);

      const record = await userRef.get();

      const user = record.data();

      return user;
    }),

  getAllUser: publicProcedure.query(async ({ ctx }) => {
    const snapRef = await ctx.firestore.collection("chat").get();

    return snapRef.docs.map((doc) => doc.data() as UserList);
  }),

  getCurrentUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const snapshot = await ctx.firestore.collection("chat").doc(input.id);
      const record = await snapshot.get();
      const user = record.data();

      return user as User;
    }),

  updateUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userRef = ctx.firestore.collection("chat").doc(input.id);

      await userRef.set(
        {
          name: input.name,
          email: input.email,
        },
        {
          merge: true,
        }
      );
    }),

  getMessageList: publicProcedure
    .input(z.object({ handle: z.string(), id: z.string() }))
    .query(async ({ ctx, input }) => {
      const handleRef = ctx.firestore.collection("username").doc(input.handle);
      const handleRecord = await handleRef.get();

      const targetHandle = handleRecord.data();

      const snapshot = await ctx.firestore
        .collection("chat")
        .doc(targetHandle?.userId)
        .collection(input.id)
        .orderBy("messagedAt")
        .get();

      return snapshot.docs.map((doc) => doc.data());
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
