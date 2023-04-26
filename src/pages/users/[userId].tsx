import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Header from "~/components/Header";
import UserBio from "~/components/users/UserBio";
import UserHero from "~/components/users/UserHero";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const UserView: NextPage<{ userId: string }> = ({ userId }) => {
  const { data: user } = api.user.getById.useQuery({
    userId,
  });

  if (!user) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{user.name}</title>
      </Head>
      <Header showBackArrow label={`${user.username}`} />
      <UserHero {...user} />
      <UserBio {...user} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = generateSSGHelper();

  const userId = context.params?.userId;

  if (typeof userId !== "string") throw new Error("no id");

  await helpers.user.getById.prefetch({ userId });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      userId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default UserView;
