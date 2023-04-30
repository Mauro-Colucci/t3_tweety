import { FC } from "react";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../Loading";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: FC<PostFeedProps> = ({ userId }) => {
  const { data: posts, isLoading } = api.post.getTest.useQuery({ userId });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {posts?.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  );
};
export default PostFeed;

//test with getStaticProps for posts
