import { BaseFileUploader } from "./BaseFileUploader";
import { FileUploaderProps } from "./BaseFileUploader";

export const ProfileUploader = ({
  fieldChange,
  mediaUrl,
}: FileUploaderProps) => (
  <BaseFileUploader fieldChange={fieldChange} mediaUrl={mediaUrl}>
    {({ fileUrl }: { fileUrl: string }) => (
      <div className="profile-uploader">
        <img
          src={fileUrl || "/assets/placeholder.svg"}
          alt="profile"
          className="profile-uploader__img"
        />
      </div>
  )}
  </BaseFileUploader>
);
