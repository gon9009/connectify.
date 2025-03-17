import Button from "../../../components/ui/Button";
import { BaseFileUploader } from "./BaseFileUploader";
import { FileUploaderProps } from "./BaseFileUploader";

export const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => (
  <BaseFileUploader fieldChange={fieldChange} mediaUrl={mediaUrl}>
    {({ fileUrl }: { fileUrl: string }) => (
      <div className="file-uploader">
        {fileUrl ? (
          <>
            <div className="file-uploader__container">
              <img src={fileUrl} alt="업로드 이미지" />
            </div>
            <p className="file-uploader__label">
              클릭하거나 사진을 드래그하여 변경하세요
            </p>
          </>
        ) : (
          <div className="file-uploader__container">
            <img src="/assets/file-upload.svg" width={96} height={77} />
            <h3>여기에 사진을 끌어놓으세요!</h3>
            <p>사진 형식만 가능합니다</p>
            <Button className="btn file-uploader__btn">
              컴퓨터에서 선택하기
            </Button>
          </div>
        )}
      </div>
    )}
  </BaseFileUploader>
);
