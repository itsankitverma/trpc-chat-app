import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Appbar from "../components/appbar/appbar";
import LandingPage from "../components/landingPage";
import { api } from "../utils/api";

export default function Index() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const usersList = api.user.getAllUser.useQuery();

  return (
    <>
      <Appbar />
      <div className="relative flex flex-col items-center justify-center overflow-hidden bg-white">
        {status === "authenticated" && (
          <div>
            <p>Registered Users</p>
            <>
              {usersList.data?.map((user) => (
                <li
                  key={user.email}
                  className="flex cursor-pointer py-4"
                  onClick={() => {
                    router.push(`${router.pathname}/p/${user.handle}`);
                  }}
                >
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.image}
                    alt=""
                  />
                  <div className="ml-3">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <span>{user?.id === session?.user.id && "(You)"}</span>
                    </div>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </li>
              ))}
            </>
          </div>
        )}
        {status === "unauthenticated" && (
          <div className="px-5">
            <LandingPage />
          </div>
        )}
      </div>
    </>
  );
}
