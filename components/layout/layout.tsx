import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { api } from "../../utils/api";
import Appbar from "../appbar/appbar";
import Sidebar from "../appbar/sideBar";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../../state/state";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();
  const hello = api.example.hello.useQuery({ id: session?.user.id! });
  const setUserState = useSetRecoilState(userState);
  const currentUser = hello.data?.user!;
  useEffect(() => {
    // @ts-ignore
    setUserState(currentUser);
  }, []);

  return (
    <div className="">
      {/* <Sidebar /> */}
      {children}
    </div>
  );
};

export default Layout;
