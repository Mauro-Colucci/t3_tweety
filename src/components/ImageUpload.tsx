import Image from "next/image";
import { FC, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

const ImageUpload: FC<ImageUploadProps> = ({
  label,
  onChange,
  disabled,
  value,
}) => {
  const [base64, setBase64] = useState(value);

  const handleChange = (base64: string) => onChange(base64);
  const handleDrop = (files: any) => {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      setBase64(e.target.result);
      handleChange(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        <span className="text-white">{label}</span>
      )}
    </div>
  );
};
export default ImageUpload;
