import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="border-b border-neutral-800 p-5">
      <div className="flex items-center gap-2">
        {showBackArrow && (
          <button
            onClick={handleBack}
            className="cursor-pointer transition hover:opacity-70"
          >
            <BiArrowBack color="white" size={20} />
          </button>
        )}
        <h1 className="text-xl font-semibold text-white">{label}</h1>
      </div>
    </div>
  );
};
export default Header;
