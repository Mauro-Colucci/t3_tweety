import { useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "~/hooks/useRegisterModal";
import useLoginModal from "~/hooks/useLoginModal";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  //use react-forms
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate, isLoading } = api.user.createAccount.useMutation({
    onSuccess: () => {
      registerModal.onClose();
      toast.success("Account created.");
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.password;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error(err.message || "Something went wrong.");
      }
    },
  });

  const onSubmit = () => {
    mutate({
      email,
      name,
      username,
      password,
    });
  };

  const onToggle = () => {
    if (isLoading) return;
    registerModal.onClose();
    loginModal.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
        type="password"
      />
    </div>
  );

  const footerContent = (
    <div className="mt-4 text-center text-neutral-400">
      <p>
        Already have an account?{" "}
        <span
          className="cursor-pointer text-white hover:underline"
          onClick={onToggle}
        >
          {" "}
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default RegisterModal;
