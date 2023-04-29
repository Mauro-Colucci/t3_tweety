import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";
import useLoginModal from "~/hooks/useLoginModal";
import { RouterOutputs } from "~/utils/api";
import moment from "moment";

interface PostItemProps {
  userId?: string;
  post: PostProps;
}

type PostProps = RouterOutputs["post"]["getTest"][number];

const PostItem: FC<PostItemProps> = ({ userId, post }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: sessionData } = useSession();

  const goToUser = (e: any) => {
    e.stopPropagation();
    router.push(`/users/${post.user.id}`);
  };

  const goToPost = () => router.push(`/posts/${post.id}`);

  const onLike = (e: any) => {
    e.stopPropagation();
    loginModal.onOpen();
  };

  return <div>PostItem</div>;
};
export default PostItem;
