interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  fullWidth,
  large,
  outline,
  secondary,
}) => {
  return (
    <button
      className={`rounded-full border-2 font-semibold transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 
      ${fullWidth ? "w-full" : "w-fit"} 
      ${
        secondary
          ? "border-black bg-white text-black"
          : "border-sky-500 bg-sky-500 text-white"
      } 
      ${large ? "px-5 py-3 text-xl" : "text-md px-4 py-2"}
      ${outline ? "border-white bg-transparent text-white" : ""}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default Button;
