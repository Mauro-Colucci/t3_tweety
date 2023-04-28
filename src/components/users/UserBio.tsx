import { useSession } from "next-auth/react";
import { FC } from "react";
import { RouterOutputs } from "~/utils/api";
import moment from "moment";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "~/hooks/useEditModal";
import EditModal from "../modals/EditModal";

type UserProps = RouterOutputs["user"]["getById"];

const UserBio: FC<UserProps> = (props) => {
  const { data } = useSession();
  const editModal = useEditModal();

  return (
    <div className="border-b border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {data?.user.id === props.id ? (
          <>
            <Button secondary label="Edit" onClick={editModal.onOpen} />
            <EditModal {...props} />
          </>
        ) : (
          <Button label="Follow" secondary onClick={() => {}} />
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
