import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";
import useLoginModal from "~/hooks/useLoginModal";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: sessionData } = useSession();
  const handleClick = () => {
    if (onClick) return onClick();
    if (auth && !sessionData) loginModal.onOpen();
    else if (href) router.push(href);
  };

  return (
    <div onClick={handleClick} className="flex items-center">
      <div className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-4 hover:bg-slate-300/10 lg:h-auto lg:w-auto lg:gap-4">
        <Icon size={28} color="white" />
        {alert && (
          <BsDot size={70} className="absolute -top-4 left-0 text-sky-500" />
        )}
        <span className="hidden text-xl text-white lg:block">{label}</span>
      </div>
    </div>
  );
};
export default SidebarItem;
