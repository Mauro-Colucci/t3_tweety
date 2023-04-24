interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  onChange,
  disabled,
  placeholder,
  type,
  value,
}) => {
  return (
    <input
      disabled={disabled}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
      className="w-full rounded-md border-2 border-neutral-800 bg-black p-4 text-lg text-white outline-none transition focus:border-2 focus:border-sky-500 disabled:cursor-not-allowed disabled:bg-neutral-900/70"
    />
  );
};
export default Input;
