import ProfileFormHeader from "../../components/features/profile/ProfileFormHeader";
import ProfileForm from "../../components/features/profile/ProfileForm";
import { useParams } from "react-router-dom";
import { useGetUserById } from "../../lib/react-query/queries";
import { useNavigate } from "react-router-dom";
import { ProfileFormData } from "../../lib/validation/profile";
import Loader from "../../components/ui/Loader";
import { useUserContext } from "../../context/AuthContext";
import { useUpdateUser } from "../../lib/react-query/queries";
import { useEffect } from "react";

// 프로필 수정 페이지
const ProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  // currentUser 는 Appwrite 의 Document 타입
  const { data: currentUser, isLoading } = useGetUserById(id || "");
  const { mutateAsync: updateUser, isPending } = useUpdateUser();

  console.log(currentUser);
  // 접근 권한 확인
  useEffect(() => {
    if (currentUser && currentUser.$id !== user.id) {
      navigate("/");
    }
  }, [currentUser, user.id, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentUser) {
    return <div>사용자를 찾을 수 없습니다.</div>;
  }

  // 프로필 변경 핸들러
  const handleEditProfile = async (value: ProfileFormData) => {
    try {
      const updatedUser = await updateUser({
        userId: currentUser.$id,
        name: value.name,
        bio: value.bio,
        file: value.file,
        imageUrl: currentUser.imageUrl,
        imageId: currentUser.imageId,
      });
      if (!updatedUser) {
        return;
      }
      setUser({
        ...user,
        name: updatedUser?.name,
        bio: updatedUser?.bio,
        imageUrl: updatedUser?.imageUrl,
      });
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
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export default ProfileEdit;
