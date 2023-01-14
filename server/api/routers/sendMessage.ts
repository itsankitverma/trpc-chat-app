import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import admin from "./firebaseAdmin";

export const messageRouter = createTRPCRouter({
  message: publicProcedure
    .input(
      z.object({
        id: z.string(),
        message: z.string(),
        name: z.string(),
        handle: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const handleRef = ctx.firestore.collection("username").doc(input.handle);
      const handleRecord = await handleRef.get();
      const targetHandle = handleRecord.data();

      const targetUser = ctx.firestore
        .collection("chat")
        .doc(targetHandle?.userId);
      const targetRecord = await targetUser.get();
      const targetRef = targetRecord.data();

      const userRef = ctx.firestore
        .collection("chat")
        .doc(targetHandle?.userId)
        .collection(input.id);

      const receiverRef = ctx.firestore
        .collection("chat")
        .doc(input.id)
        .collection(targetHandle?.userId);

      await userRef.add({
        senderName: input.name,
        senderId: input.id,
        sender: input.id,
        receiverName: targetRef?.name,
        receiverId: targetHandle?.userId,
        message: input.message,
        messagedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      await receiverRef.add({
        senderName: input.name,
        senderId: input.id,
        receiverName: targetRef?.name,
        receiverId: targetHandle?.userId,
        message: input.message,
        messagedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }),
});
