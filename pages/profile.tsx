import { useSession } from "next-auth/react";
import UpdateProfile from "../components/updateProfile";

export default function Handle() {
  const { status } = useSession();

  if (status === "loading") {
    return "loading";
  }

  return (
    <div className="flex w-full items-center justify-center">
      {/* <Appbar /> */}
      <div className="px-5 md:max-w-4xl ">
        <UpdateProfile />
      </div>
    </div>
  );
}
