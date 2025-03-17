import { useState, useCallback } from "react";
import { FileWithPath } from "react-dropzone";

// 파일 업로드 커스텀 훅 
export const useFileUploader = (
  mediaUrl: string,
  fieldChange: (files: File[]) => void
) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const convertFileToUrl = useCallback(
    (file: File) => URL.createObjectURL(file),
    []
  );

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [fieldChange, convertFileToUrl]
  );

  return {
    fileUrl,
    onDrop,
    files,
  };
};
