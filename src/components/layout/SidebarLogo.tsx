import { useRouter } from "next/router";
import { GiRaven } from "react-icons/gi";

const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div
      className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-4 transition hover:bg-blue-300/10"
      onClick={() => router.push("/")}
    >
      <GiRaven size={28} color="white" />
    </div>
  );
};
export default SidebarLogo;
