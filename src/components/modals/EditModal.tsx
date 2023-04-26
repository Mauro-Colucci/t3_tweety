import useEditModal from "~/hooks/useEditModal";
import { useEffect, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "~/hooks/useRegisterModal";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import { string } from "zod";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const editModal = useEditModal();
  const [name, setName] = useState<string | null>("");
  const [username, setUsername] = useState<string | null>("");
  const [profileImage, setProfileImage] = useState<string | null>("");
  const [coverImage, setCoverImage] = useState<string | null>("");
  const [bio, setBio] = useState<string | null>("");

  const ctx = api.useContext();

  const { data: user } = api.user.getCurrent.useQuery();

  const { mutate, isLoading } = api.user.edit.useMutation({
    onSuccess: () => {
      //ctx.user.getCurrent.invalidate();
      ctx.user.getById.invalidate();
      editModal.onClose();
      toast.success("Profile updated.");
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setProfileImage(user.profileImage);
      setCoverImage(user.coverImage);
      setBio(user.bio);
    }
  }, [
    user?.bio,
    user?.coverImage,
    user?.name,
    user?.profileImage,
    user?.username,
  ]);

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
