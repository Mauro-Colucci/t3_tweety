import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import useLoginModal from "~/hooks/useLoginModal";
import useRegisterModal from "~/hooks/useRegisterModal";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [body, setBody] = useState<string>("");

  const { data: sessionData } = useSession();

  const ctx = api.useContext();

  const { mutate, isLoading } = api.post.create.useMutation({
    onSuccess: () => {
      toast.success("post created");
      setBody("");
      ctx.post.getAll.invalidate();
    },
    onError: (e) => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div className="border-b border-neutral-800 px-5 py-2">
      {!!sessionData ? (
        <div className="flex gap-4">
          <div>
            <Avatar userId={sessionData.user.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              placeholder={placeholder}
              className="peer mt-3 w-full resize-none bg-black text-xl text-white placeholder-neutral-500 outline-none ring-0 disabled:opacity-80"
            ></textarea>
            <hr className="h-[1px] w-full border-neutral-800 opacity-0 transition peer-focus:opacity-100" />
            <div className="mt-4 flex justify-end">
              <Button
                label="Chirp"
                disabled={isLoading || !body}
                onClick={() => mutate({ body })}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="mb-4 text-center text-2xl font-bold text-white">
            Welcome to CahCaw!
          </h1>
          <div className="flex items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Form;
