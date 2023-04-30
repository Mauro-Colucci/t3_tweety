import { Comment, User } from "@prisma/client";
import { FC } from "react";
import CommentItem from "./CommentItem";
import { RouterOutputs } from "~/utils/api";

interface CommentFeedProps {
  comments?: [Comment & { user: User }];
}

const CommentFeed: FC<CommentFeedProps> = ({ comments }) => {
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};
export default CommentFeed;
