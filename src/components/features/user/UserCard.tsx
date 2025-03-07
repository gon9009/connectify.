import { Link } from "react-router-dom";

type UserCardProps = {
  user: {
    $id: string;
    imageUrl: string;
    name: string;
    username: string;
  };
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
      width={56}
      height={56}
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
