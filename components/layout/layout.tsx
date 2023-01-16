import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userProfile, usersListState } from "../../state/state";
import { api } from "../../utils/api";
import Navbar from "../appbar/navbar";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session } = useSession();

  // api calls
  const users = api.user.getCurrentUser.useQuery({
    id: session?.user.id as string,
  });
  const listOfUsers = api.user.getAllUser.useQuery();

  // constants
  const user = users.data;
  const list = listOfUsers.data;

  // set recoil states
  const setUserProfile = useSetRecoilState(userProfile);
  const setUsersList = useSetRecoilState(usersListState);

  useEffect(() => {
    if (user) {
      setUserProfile(user);
    }

    if (list) {
      setUsersList(list);
    }
  }, [user, list]);

  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
