import { Button } from "@/components/ui";
import { BaseFileUploader } from "./BaseFileUploader";
import { FileUploaderProps } from "./BaseFileUploader";

export const PostFileUploader = ({
  fieldChange,
  mediaUrl,
}: FileUploaderProps) => (
  <BaseFileUploader fieldChange={fieldChange} mediaUrl={mediaUrl}>
    {({ fileUrl }: { fileUrl: string }) => (
      <div className="file-uploader">
        {fileUrl ? (
          <>
            <div className="file-uploader__container">
              <img
                className="file-uploader__img"
                src={fileUrl}
                alt="업로드 이미지"
              />
            </div>
          </>
        ) : (
          <div className="file-uploader__container">
            <img src="/assets/file-upload.svg" width={96} height={77} />
            <h3 className="file-uploader__title">여기에 사진을 끌어놓으세요</h3>
            <p className="file-uploader__description">
              사진 형식 (PNG,SVG) 만 가능합니다
            </p>
            <Button variant="post">컴퓨터에서 선택하기</Button>
          </div>
        )}
      </div>
    )}
  </BaseFileUploader>
);
