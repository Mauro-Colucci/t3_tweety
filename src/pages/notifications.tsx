import { GetServerSideProps } from "next";
import Header from "~/components/Header";
import NotificationsFeed from "~/components/NotificationsFeed";
import { getServerAuthSession } from "~/server/auth";

const Notifications = () => {
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};
export default Notifications;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...session,
    },
  };
};
