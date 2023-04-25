import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Layout from "~/components/Layout";
import RegisterModal from "~/components/modals/RegisterModal";
import LoginModal from "~/components/modals/LoginModal";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Toaster position="bottom-center" />
      <RegisterModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
