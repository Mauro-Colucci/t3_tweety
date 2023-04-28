import useEditModal from "~/hooks/useEditModal";
import { FC, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import { RouterOutputs, api } from "~/utils/api";
import { toast } from "react-hot-toast";
import ImageUpload from "../ImageUpload";

type UserProps = RouterOutputs["user"]["getById"];

const EditModal: FC<UserProps> = (props) => {
  const editModal = useEditModal();
  const [name, setName] = useState(props.name);
  const [username, setUsername] = useState(props.username);
  const [profileImage, setProfileImage] = useState(props.profileImage!);
  const [coverImage, setCoverImage] = useState(props.coverImage!);
  const [bio, setBio] = useState(props.bio);

  const ctx = api.useContext();

  const { mutate, isLoading } = api.user.edit.useMutation({
    onSuccess: () => {
      ctx.user.getAll.invalidate();
      ctx.user.getById.invalidate();
      editModal.onClose();
      toast.success("Profile updated.");
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const onSubmit = () => {
    if (
      typeof name === "string" &&
      typeof username === "string" &&
      typeof bio === "string"
    )
      mutate({ name, username, profileImage, coverImage, bio });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name ?? ""}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio ?? ""}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username ?? ""}
        disabled={isLoading}
      />
      <ImageUpload
        value={profileImage || ""}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage || ""}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};
export default EditModal;
