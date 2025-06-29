import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProfileValidation,
  ProfileFormData,
} from "../../../lib/validation/profile";
import { Input, Label, Button, Textarea } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { User } from "../../../types/types";
import { ProfileUploader } from "../fileuploader/ProfileUploader";
import { ProfileUser } from "../../../types/types";

// CurrentUser의 타입
type ProfileFormProps = {
  handleEditProfile: (data: ProfileFormData) => void;
  // 현재 사용자 정보 표시용
  currentUser: ProfileUser;
  isPending: boolean;
  user: User;
};

export const ProfileForm = ({
  handleEditProfile,
  currentUser,
  isPending,
  user,
}: ProfileFormProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(handleEditProfile)} className="profile-form">
      {/* 프로필 이미지 변경  */}
      <div className="profile-form__container">
        <ProfileUploader
          fieldChange={(files) => setValue("file", files)}
          mediaUrl={currentUser.imageUrl}
        />
        {errors.file && <p className="error-message">{errors.file.message}</p>}
      </div>

      {/* 이름 (name) 변경 */}
      <div className="profile-form__container">
        <Label htmlFor="name" className="profile-form__label">
          이름
        </Label>
        <Input
          variant="post"
          id="name"
          type="text"
          placeholder="이름을 변경하세요"
          {...register("name")}
          error={errors.name?.message}
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>

      {/* 유저이름 (username) 변경 (disabled) */}
      <div className="profile-form__container">
        <Label htmlFor="username" className="profile-form__label">
          유저이름
        </Label>

        <Input
          id="username"
          type="text"
          className={`profile-form__input profile-form__input--disabled`}
          {...register("username")}
          disabled
          style={{ cursor: "not-allowed" }}
        />
        {errors.username && (
          <p className="error-message">{errors.username.message}</p>
        )}
      </div>

      {/* 이메일 (email) 변경 (disabled) */}
      <div className="profile-form__container">
        <Label htmlFor="email" className="profile-form__label">
          이메일
        </Label>
        <Input
          id="email"
          type="email"
          className={`profile-form__input profile-form__input--disabled`}
          {...register("email")}
          disabled
          style={{ cursor: "not-allowed" }}
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
      </div>

      {/* 바이오 (bio) 변경 */}
      <div className="profile-form__container">
        <Label htmlFor="bio" className="profile-form__label">
          자기소개
        </Label>
        <Textarea
          id="bio"
          className={`profile-form__textarea ${
            errors.bio ? "profile-form__textarea--error" : ""
          }`}
          {...register("bio")}
        />
        {errors.bio && <p className="error-message">{errors.bio.message}</p>}
      </div>

      {/* 제출 버튼 */}
      <div className="profile-form__btn-container">
        <Button onClick={() => navigate(-1)} variant="cancle" type="button">
          취소
        </Button>
        <Button type="submit" variant="post" disabled={isPending}>
          {isPending ? "제출 중..." : "제출"}
        </Button>
      </div>
    </form>
  );
};
