import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import admin from "../../../server/api/routers/firebaseAdmin";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "298328387675-02mg9lq3ttrvqiislpbmvq74e2brfuir.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  secret:
    "process.env.NEXTAUTH_SECRET!askbdjsdhgfbdbgfibdifgbi@@@ksldfsdigsgno",
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.id) {
        return false;
      }
      const db = admin.firestore();
      const userRef = db.collection("chat").doc(user.id);

      await userRef.set({
        name: user.name,
      });
      return true;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.uid as string;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      console.log("token", token);
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
