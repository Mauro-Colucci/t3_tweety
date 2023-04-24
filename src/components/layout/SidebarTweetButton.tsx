import { useRouter } from "next/router";
import { FaFeather } from "react-icons/fa";
import useLoginModal from "~/hooks/useLoginModal";

const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();

  return (
    <button
      //onClick={() => router.push("/")}
      onClick={() => loginModal.onOpen()}
      className="mt-6 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-sky-500 p-4 transition hover:bg-opacity-80 lg:h-auto lg:w-full lg:py-2"
    >
      <FaFeather size={24} color="white" className="lg:hidden" />
      <p className="hidden text-xl font-semibold text-white lg:block">
        Caw Caw!
      </p>
    </button>
  );
};
export default SidebarTweetButton;
