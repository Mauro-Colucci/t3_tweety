import { FC } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Image from "next/image";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: FC<AvatarProps> = ({ userId, hasBorder, isLarge }) => {
  const { data: user, isLoading } = api.user.getById.useQuery({ userId });
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      className={`${hasBorder ? "border-4 border-black" : ""} ${
        isLarge ? "h-32 w-32" : "h-12 w-12"
      } relative cursor-pointer rounded-full transition hover:opacity-90`}
    >
      <Image
        fill
        style={{ objectFit: "cover", borderRadius: "100%" }}
        alt={`${user?.username}'s avatar.`}
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/users/${userId}`);
        }}
        src={user?.profileImage || "/images/profile-placeholder.png"}
      />
    </div>
  );
};
export default Avatar;
