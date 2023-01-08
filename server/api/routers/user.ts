import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import admin from "./firebaseAdmin";

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

    return snapRef.docs.map((doc) => doc.data());
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
