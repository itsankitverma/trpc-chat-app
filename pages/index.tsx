import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/api";

const Home: NextPage = () => {
  const { status } = useSession();

  return (
    <>
      {status === "unauthenticated" && (
        <button
          data-testid="loginButton"
          onClick={() => {
            signIn();
          }}
        >
          <div className="app-bar-btn flex items-center text-sm md:gap-2">
            <span className="block pl-1 md:pl-0">login</span>
          </div>
        </button>
      )}
      {status === "authenticated" && (
        <button
          className="flex max-w-fit cursor-pointer items-center gap-2 rounded-lg bg-red-500 p-2 text-white"
          data-testid="signOutButton"
          onClick={async () => {
            signOut({
              callbackUrl: "/",
            });
          }}
        >
          <span className="block pl-1 md:pl-0">log out</span>
        </button>
      )}
    </>
  );
};

export default Home;
