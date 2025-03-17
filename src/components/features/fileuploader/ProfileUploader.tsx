import { BaseFileUploader } from "./BaseFileUploader";
import { FileUploaderProps } from "./BaseFileUploader";

export const ProfileUploader = ({
  fieldChange,
  mediaUrl,
}: FileUploaderProps) => (
  <BaseFileUploader fieldChange={fieldChange} mediaUrl={mediaUrl}>
    {({ fileUrl }: { fileUrl: string }) => (
      <div className="profile-uploader__container">
        <img
          src={fileUrl || "/assets/placeholder.svg"}
          alt="profile"
          className="profile-uploader__img"
        />
        <p className="profile-uploader__description">프로필 변경하기</p>
      </div>
    )}
  </BaseFileUploader>
);
