import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import Button from "../../../components/ui/Button";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

export const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  // 파일 (blob) 객체를 입력받아 브라우저에서 접근 가능한 URL 생성
  // 파일을 브라우저에서 사용할 수 있는 URL로 변환시킨다
  const convertFileToUrl = (file: File) => URL.createObjectURL(file);

  // 파일을 드래그 드랍 했을때 실행되는 함수
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [fieldChange]
  );

  // file (blob 형태) -> convertFileToUrl -> fileUrl (이미지 URL)
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div {...getRootProps()} className="file-uploader">
      <input {...getInputProps()} className="file-uploader__input" />
      {fileUrl ? (
        <>
          <div className="file-uploader__container">
            <img
              src={fileUrl}
              alt="업로드 이미지"
              className="file-uploader__image"
            />
          </div>
          <p className="file-uploader__label">
            클릭하거나 사진을 드래그하여 변경하세요
          </p>
        </>
      ) : (
        <div className="file-uploader__container">
          <img
            src="/assets/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
          />
          <h3 className="file-uploader__title">여기에 사진을 끌어놓으세요!</h3>
          <p className="file-uploader__description">사진 형식만 가능합니다</p>

          <Button className="btn file-uploader__btn">
            컴퓨터에서 선택하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
