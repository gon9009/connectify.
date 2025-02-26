import { Link } from "react-router-dom";

type UserCardProps = {
  user: {
    $id: string;
    imageUrl: string;
    name: string;
    username: string;
  };
};

// 나중에 타입을 알아내어 별도로 user 타입 추출하기
const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        className="user-card__avatar"
      />
      <div className="user-card__info">
        <p className="user-card__name">{user.name}</p>
        <p className="user-card__username">@{user.username}</p>
      </div>
    </Link>
  );
};
export default UserCard;
