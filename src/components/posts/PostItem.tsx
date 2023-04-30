import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";
import useLoginModal from "~/hooks/useLoginModal";
import { RouterOutputs, api } from "~/utils/api";
import moment from "moment";
import Avatar from "../Avatar";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { toast } from "react-hot-toast";

interface PostItemProps {
  //userId?: string;
  post: PostProps;
}

type PostProps = RouterOutputs["post"]["getTest"][number];

const PostItem: FC<PostItemProps> = ({ post }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: sessionData } = useSession();
  const ctx = api.useContext();

  const { mutate } = api.post.like.useMutation({
    onSuccess: () => {
      toast.success(
        `${
          isLiked(sessionData?.user.id!)
            ? "I don't like it anymore."
            : "I like it!"
        }`
      );
      ctx.post.getTest.invalidate();
      ctx.post.getById.invalidate();
      ctx.user.getCurrent.invalidate();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const goToUser = (e: any) => {
    e.stopPropagation();
    router.push(`/users/${post.user.id}`);
  };

  const goToPost = () => router.push(`/posts/${post.id}`);

  const onLike = (e: any) => {
    e.stopPropagation();
    if (!sessionData?.user) loginModal.onOpen();
    mutate({ postId: post.id });
  };

  const isLiked = (id: string) => {
    return post.likedIds.includes(id);
  };

  return (
    <div
      onClick={goToPost}
      className="cursor-pointer border-b border-neutral-800 p-5 transition hover:bg-neutral-900"
    >
      <div className="flex gap-3">
        <Avatar userId={post.user.id} />
        <div>
          <div className="flex items-center gap-2">
            <span
              onClick={goToUser}
              className="cursor-pointer font-semibold text-white hover:underline"
            >
              {post.user.name}
            </span>
            <span
              onClick={goToUser}
              className="hidden cursor-pointer text-neutral-500 hover:underline md:block"
            >{`@${post.user.username}`}</span>
            <span className="text-sm text-neutral-500">
              · {moment(post.createdAt).fromNow(true)}
            </span>
          </div>
          <p className="mt-1 text-white">{post.body}</p>
          <div className="mt-3 flex items-center gap-10">
            <div className="flex cursor-pointer items-center gap-2 text-neutral-500 transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <span>{post.comments?.length}</span>
            </div>
            <div
              onClick={onLike}
              className={`flex cursor-pointer items-center gap-2  transition  ${
                isLiked(sessionData?.user.id!)
                  ? "text-red-500 hover:text-neutral-500"
                  : "text-neutral-500 hover:text-red-500"
              }`}
            >
              {isLiked(sessionData?.user.id!) ? (
                <AiFillHeart size={20} />
              ) : (
                <AiOutlineHeart size={20} />
              )}
              <span>{post.likedIds?.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostItem;
