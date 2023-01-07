import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";

export const workRouter = createFirestoreRouter().query("getAll", {
  input: z.object({
    id: z.string(),
  }),
  async resolve({ ctx, input }) {
    // const handleRef = ctx.firestore.collection("users").doc(input.id);
    // const handleRecord = await handleRef.get();
    // const handle = handleRecord.docs.map((doc) => doc.data());
    return "This handle works";
  },
});
