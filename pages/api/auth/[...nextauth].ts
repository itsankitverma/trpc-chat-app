import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import admin from "../../../server/api/routers/firebaseAdmin";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET ?? "",
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

      const emailSplit = user.email?.split("@")[0];
      const handleName = `${emailSplit}_${Math.floor(
        100000 + Math.random() * 900000
      )}`;

      const usernameRef = db.collection("username").doc(handleName);
      await usernameRef.set({
        userId: user.id,
      });
      await userRef.set({
        name: user.name,
        email: user.email,
        id: user.id,
        handle: handleName,
        image: user.image,
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
