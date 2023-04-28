import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";
import { FC } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: FC<ModalProps> = ({
  actionLabel,
  isOpen,
  onClose,
  onSubmit,
  body,
  disabled,
  footer,
  title,
}) => {
  const handleClose = () => {
    if (disabled) return;
    onClose();
  };
  const handleSubmit = () => {
    if (disabled) return;
    onSubmit();
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70">
        <div className="mx-auto my-6 h-full w-full lg:h-auto lg:w-3/6 lg:max-w-3xl">
          {/*content*/}
          <div className="flex h-full w-full flex-col rounded-lg bg-black shadow-lg lg:h-auto">
            {/*header */}
            <div className="flex items-center justify-between rounded-t p-10">
              <h3 className="text-3xl font-semibold text-white">{title}</h3>
              <button
                onClick={handleClose}
                className="p-1 text-white transition hover:opacity-70"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/*body */}
            <div className="flex-auto p-10">{body}</div>
            {/*footer */}
            <div className="flex flex-col gap-2 p-10">
              <Button
                disabled={disabled}
                label={actionLabel}
                secondary
                fullWidth
                large
                onClick={handleSubmit}
              />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
