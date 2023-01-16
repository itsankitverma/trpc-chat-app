import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import LandingPage from "../components/landingPage";
import { userProfile, usersListState } from "../state/state";

export default function Index() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [list] = useRecoilState(usersListState);
  const [currentUser] = useRecoilState(userProfile);

  return (
    <>
      <div className="relative flex flex-col items-center justify-center overflow-hidden bg-white">
        {status === "authenticated" && (
          <div>
            <p>Registered Users</p>
            <>
              {list.map((user) => (
                <li
                  key={user?.email}
                  className="flex cursor-pointer py-4"
                  onClick={() => {
                    user.id === currentUser.id
                      ? router.push(`/profile`)
                      : router.push(`${router.pathname}/p/${user.handle}`);
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
