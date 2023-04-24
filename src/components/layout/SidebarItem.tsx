import { IconType } from "react-icons";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
}) => {
  return (
    <div className="flex items-center">
      <div className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-4 hover:bg-slate-300/10 lg:h-auto lg:w-auto lg:gap-4">
        <Icon size={28} color="white" />
        <span className="hidden text-xl text-white lg:block">{label}</span>
      </div>
    </div>
  );
};
export default SidebarItem;
