import ProfileFormHeader from "../../components/features/profile/ProfileFormHeader";
import ProfileForm from "../../components/features/profile/ProfileForm";
import { useParams } from "react-router-dom";
import { useGetUserById } from "../../lib/react-query/queries";
import { useNavigate } from "react-router-dom";
import { ProfileFormData } from "../../lib/validation/profile";
import Loader from "../../components/ui/Loader";
import { useUserContext } from "../../context/AuthContext";
// useUpdateUser 추가 

// 프로필 수정 페이지
const ProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();

  const { data: currentUser, isLoading } = useGetUserById(id || "");

  if (isLoading) {
    return <Loader />;
  }

  // 프로필 변경 핸들러
  const handleEditProfile = (value: ProfileFormData) => {
    try {
      // TODO: 프로필 업데이트 mutation 구현
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-edit-page">
      <div className="profile-edit__container">
        <ProfileFormHeader title="프로필 수정" />
        <ProfileForm
          user={user}
          currentUser={currentUser}
          handleEditProfile={handleEditProfile}
          // isPending={isPending}
        />
      </div>
    </div>
  );
};

export default ProfileEdit;
