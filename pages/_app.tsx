import { AppProps, type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../utils/api";

import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { RecoilRoot } from "recoil";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </RecoilRoot>
  );
};

export default api.withTRPC(MyApp);
