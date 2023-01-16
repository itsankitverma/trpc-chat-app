import { signOut, useSession } from "next-auth/react";
import React from "react";
import Appbar from "../components/appbar/appbar";

const Settings = () => {
  const { data: session, status } = useSession();

  return (
    <div className="md:ml-64">
      {/* <Appbar /> */}
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
    </div>
  );
};

export default Settings;
