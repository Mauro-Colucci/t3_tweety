import { Comment, User } from "@prisma/client";
import { useRouter } from "next/router";
import { FC } from "react";
import moment from "moment";
import Avatar from "../Avatar";

interface CommentItemProps {
  data: Comment & { user: User };
}

const CommentItem: FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();

  const goToUser = () => router.push(`/users/${data.user.id}`);
  return (
    <div className="cursor-pointer border-b border-neutral-800 p-5 transition hover:bg-neutral-900">
      <div className="flex gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex items-center gap-2">
            <span
              onClick={goToUser}
              className="cursor-pointer font-semibold text-white hover:underline"
            >
              {data.user.name}
            </span>
            <span
              onClick={goToUser}
              className="hidden cursor-pointer text-neutral-500 hover:underline md:block"
            >{`@${data.user.username}`}</span>
            <span className="text-sm text-neutral-500">
              · {moment(data.createdAt).fromNow(true)}
            </span>
          </div>
          <div className="mt-1 text-white">{data.body}</div>
        </div>
      </div>
    </div>
  );
};
export default CommentItem;
