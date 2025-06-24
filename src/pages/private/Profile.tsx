import { Link, Outlet, useParams, NavLink } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
import { useGetUserById } from "../../lib/react-query/queries";
import { Loader } from "@/components/ui";

interface UserStatProps {
  value: string | number;
  label: string;
}

interface EditProfileProps {
  userId: string;
}

interface ProfileTabProps {
  id?: string;
}

interface ProfileInfo {
  name: string;
  username: string;
  postlength: number;
  bio: string;
}

// 유저 스탯
const UserStat = ({ value, label }: UserStatProps) => (
  <div className="statblock">
    <p className="stat__value">{value}</p>
    <p className="stat__label">{label}</p>
  </div>
);

// 프로필 탭 (게시물 + 좋아요)
const ProfileTabs = ({ id }: ProfileTabProps) => {
  return (
    <div className="profile__tabs">
      <NavLink
        to={`/profile/${id}`}
        end
        className={({ isActive }) => `profile__tab ${isActive ? "active" : ""}`}
      >
        <img src="/assets/posts.svg" alt="posts" width={20} height={20} />
        게시물
      </NavLink>
      <NavLink
        to={`/profile/${id}/liked`}
        className={({ isActive }) => `profile__tab ${isActive ? "active" : ""}`}
      >
        <img src="/assets/like.svg" alt="like" width={20} height={20} />
        좋아요
      </NavLink>
      <NavLink
        to={`/profile/${id}/saved`}
        className={({ isActive }) => `profile__tab ${isActive ? "active" : ""}`}
      >
        <img src="/assets/save.svg" alt="like" width={20} height={20} />
        저장됨
      </NavLink>
    </div>
  );
};

// 프로필 수정
const EditProfile = ({ userId }: EditProfileProps) => {
  return (
    <div className="profile__actions">
      <Link to={`/edit-profile/${userId}`} className="edit-profile">
        <img src="/assets/edit.svg" alt="edit" width={20} height={20} />
        <p>프로필 수정</p>
      </Link>
    </div>
  );
};

// 프로필 계정 정보
const ProfileInfo = ({ name, username, postlength, bio }: ProfileInfo) => {
  return (
    <div className="profile__info">
      <div className="profile__name">
        <h1>{name}</h1>
        <p className="profile__username">@{username}</p>
      </div>
      <div className="profile__stats">
        <UserStat value={postlength} label="Posts" />
      </div>
      <p className="profile__bio">{bio}</p>
    </div>
  );
};

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();

// URL 파라미터(id)에 해당하는 사용자의 정보
  const { data: currentUser, isLoading } = useGetUserById(id || "");
  const isProfileOwner = user.id === currentUser?.$id;

  if (isLoading) {
    return (
      <div className="profile">
        <Loader />
      </div>
    );
  }
  
  if (!currentUser) {
    return <p className="error-message">유저 정보를 불러올 수 없습니다.</p>;
  }

 // 기존 creator -> 해당 게시글을 작성한 "유저"의 정보 
 // 추가하는 creator -> 현재 프로필 유저의 정보를 강제로 넣는것  

  // ProfileOwner 일때 프로필 수정과 / 프로필 탭이 활성화
  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__header">
          <div className="profile__header-container">
            <img
              src={
                currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
              }
              width={144}
              height={144}
              alt="profile"
              className="profile__image"
            />
            <ProfileInfo
              name={currentUser.name}
              username={currentUser.username}
              postlength={currentUser.posts.length}
              bio={currentUser.bio}
            />
            {isProfileOwner && <EditProfile userId={currentUser.$id} />}
          </div>
        </div>
        <ProfileTabs id={id} />
        <Outlet
          context={{
            posts: currentUser.posts.map((post) => ({
              ...post,
              creator: {
                $id: currentUser.$id,
                name: currentUser.name,
                imageUrl: currentUser.imageUrl,
              },
            })),
            save: isProfileOwner ? currentUser.save : [],
            liked: isProfileOwner ? currentUser.liked : [],
            isProfileOwner,
            isLoading,
          }}
        />
      </div>
    </div>
  );
};

export default Profile;

// useGetUserByID 는 getUserById 쿼리 훅을 호출 -> creator 필드가 기본적으로 포함 X 
// save,liked,isProfileOwner, isLoading
// 위 값들은 라우트 Outlet 의 Context 로 전달되어 하위 컴포넌트에서  인증/권한 /상태관리를 위해 사용됩니다.
// API 에서 받은 원본 데이터에는 없는 값이며 프론트에서 -> context 로 추가해서 전달하는 구조
// currentUser 는 URL의 id 파리미터에 해당하는 사용자의 정보 