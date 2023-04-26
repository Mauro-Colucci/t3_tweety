import { FC } from "react";
import Image from "next/image";
import Avatar from "../Avatar";
import { RouterOutputs } from "~/utils/api";

type UserProps = RouterOutputs["user"]["getById"];

const UserHero: FC<UserProps> = ({ coverImage, id }) => {
  return (
    <div>
      <div className="relative h-44 bg-neutral-700">
        {!!coverImage && (
          <Image
            src={coverImage}
            fill
            alt="cover image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={id as string} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};
export default UserHero;
