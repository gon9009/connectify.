import ProfileFormHeader from "../../components/features/profile/ProfileFormHeader";
import ProfileForm from "../../components/features/profile/ProfileForm";

// 프로필 수정 페이지
const ProfileEdit = () => {
  // 프로파일 변경 핸들러
  handleEditProfile = (data) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ProfileFormHeader title="프로필 수정" />
      <ProfileForm handleEditProfile={handleEditProfile} />
    </>
  );
};

export default ProfileEdit;
