import { useSession } from "next-auth/react";
import { FC } from "react";
import { RouterOutputs, api } from "~/utils/api";
import moment from "moment";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "~/hooks/useEditModal";
import EditModal from "../modals/EditModal";
import { toast } from "react-hot-toast";
import useLoginModal from "~/hooks/useLoginModal";

type UserProps = RouterOutputs["user"]["getById"];

const UserBio: FC<UserProps> = (props) => {
  const { data: sessionData } = useSession();
  const editModal = useEditModal();
  const loginModal = useLoginModal();

  const { data } = api.user.getCurrent.useQuery(undefined, {
    enabled: !!sessionData,
  });

  const ctx = api.useContext();

  const { mutate } = api.user.follow.useMutation({
    onSuccess: () => {
      toast.success(`${isFollowing(props.id!) ? "Unfollowed" : "Followed"}`);
      ctx.user.getCurrent.invalidate();
    },
    onError: (e) => {
      toast.error("Something went wrong");
    },
  });

  const isFollowing = (id: string) => {
    return data?.followingIds.includes(id);
  };

  return (
    <div className="border-b border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {data?.id === props.id && (
          <>
            <Button secondary label="Edit" onClick={editModal.onOpen} />
            <EditModal {...props} />
          </>
        )}
        {!!data && data?.id !== props.id && (
          <Button
            label={`${isFollowing(props.id!) ? "Unfollow" : "Follow"}`}
            secondary={!isFollowing(props.id!)}
            outline={isFollowing(props.id!)}
            onClick={() => mutate({ userId: props.id! })}
          />
        )}
        {!sessionData && (
          <Button label="Login" secondary onClick={loginModal.onOpen} />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <span className="text-2xl font-semibold text-white">
            {props.name}
          </span>
          <span className="text-md text-neutral-500">{`@${props.username}`}</span>
        </div>
        <div className="mt-4 flex flex-col">
          <p className="text-white">{props.bio}</p>
          <div className="mt-4 flex items-center gap-2 text-neutral-500">
            <BiCalendar size={24} />
            <span>Joined {moment(props.createdAt).format("MMMM YYYY")}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-6">
          <div className="flex items-center gap-1">
            <span className="text-white">{props.followingIds?.length}</span>
            <span className="text-neutral-500">Following</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white">{props.followersCount}</span>
            <span className="text-neutral-500">Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserBio;
