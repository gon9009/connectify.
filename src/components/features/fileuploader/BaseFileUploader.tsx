import { useDropzone } from "react-dropzone";
import { useFileUploader } from "../../../hooks/useFileUploader";

export type FileUploaderRenderProps = {
  getRootProps: () => any;
  getInputProps: () => any;
  fileUrl: string;
};

// BaseFileUploader props 타입
export type BaseFileUploaderProps = {
  children: (props: FileUploaderRenderProps) => React.ReactNode;
  mediaUrl: string;
  fieldChange: (files: File[]) => void;
};

// 파일 업로더 props (PostFile, ProfileFile)
export type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

export const BaseFileUploader = ({
  children,
  mediaUrl,
  fieldChange,
}: BaseFileUploaderProps) => {
  const { onDrop, fileUrl } = useFileUploader(mediaUrl, fieldChange); 

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children({ getRootProps, getInputProps, fileUrl })}
    </div>
  );
};
