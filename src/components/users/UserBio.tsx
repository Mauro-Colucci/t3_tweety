import { useSession } from "next-auth/react";
import { FC } from "react";
import { RouterOutputs } from "~/utils/api";
import moment from "moment";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "~/hooks/useEditModal";

type UserProps = RouterOutputs["user"]["getById"];

const UserBio: FC<UserProps> = ({
  id,
  name,
  username,
  bio,
  createdAt,
  followingIds,
  followersCount,
}) => {
  const { data } = useSession();
  const editModal = useEditModal();

  return (
    <div className="border-b border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {data?.user.id === id ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button label="Follow" secondary onClick={() => {}} />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <span className="text-2xl font-semibold text-white">{name}</span>
          <span className="text-md text-neutral-500">{`@${username}`}</span>
        </div>
        <div className="mt-4 flex flex-col">
          <p className="text-white">{bio}</p>
          <div className="mt-4 flex items-center gap-2 text-neutral-500">
            <BiCalendar size={24} />
            <span>Joined {moment(createdAt).format("MMMM YYYY")}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-6">
          <div className="flex items-center gap-1">
            <span className="text-white">{followingIds?.length}</span>
            <span className="text-neutral-500">Following</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white">{followersCount}</span>
            <span className="text-neutral-500">Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserBio;
