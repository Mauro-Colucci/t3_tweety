import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Form from "~/components/Form";
import Header from "~/components/Header";
import PostItem from "~/components/posts/PostItem";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const PostView: NextPage<{ postId: string }> = ({ postId }) => {
  const { data: post } = api.post.getById.useQuery({
    postId,
  });

  if (!post) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${post.user.name}'s post.`}</title>
      </Head>
      <Header label="Post" showBackArrow />
      <PostItem post={post} />
      <Form postId={postId} isComment placeholder="Post your reply" />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = generateSSGHelper();

  const postId = context.params?.postId;

  if (typeof postId !== "string") throw new Error("no id");

  await helpers.post.getById.prefetch({ postId });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      postId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default PostView;
