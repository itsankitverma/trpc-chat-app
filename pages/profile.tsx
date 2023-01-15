import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useRecoilState } from "recoil";
import Appbar from "../components/appbar/appbar";
import Layout from "../components/layout/layout";
import UpdateProfile from "../components/updateProfile";
import { userProfile } from "../state/state";
import { api } from "../utils/api";

export default function Handle() {
  const { data: session, status } = useSession();
  const [userId] = useRecoilState(userProfile);
  const router = useRouter();
  const { handle } = router.query;

  const user = api.user.getUser.useQuery({
    handle: handle as string,
  });

  if (status === "loading") {
    return "loading";
  }

  return (
    <div>
      <Appbar />
      <div className="px-5 md:max-w-4xl">
        <Layout>
          <UpdateProfile />
        </Layout>
      </div>
    </div>
  );
}
