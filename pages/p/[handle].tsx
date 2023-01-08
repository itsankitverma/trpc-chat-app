import { useSession } from "next-auth/react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import Appbar from "../../components/appbar/appbar";
import VisitedHandle from "../../components/visitedHandle";
import UpdateProfile from "../../components/updateProfile";

export default function Handle() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { handle } = router.query;

  const user = api.user.getUser.useQuery({
    handle: handle as string,
  });

  if (status === "loading") {
    return "loading";
  }

  if (user.data?.id === session?.user.id) {
    return (
      <div>
        <Appbar />
        <div className="px-5 md:max-w-4xl">
          <UpdateProfile />
        </div>
      </div>
    );
  } else {
    return <VisitedHandle />;
  }
}
