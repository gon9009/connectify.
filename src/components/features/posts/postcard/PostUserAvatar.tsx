import { Link } from "react-router-dom";

export type PostUserAvatarProp = {
  creatorId: string;
  creatorImageUrl: string | undefined;
};

export const PostUserAvatar = ({
  creatorId,
  creatorImageUrl,
}: PostUserAvatarProp) => {
  return (
    <Link to={`/profile/${creatorId}`} >
      <img
        width={48}
        height={48}
        src={creatorImageUrl || "/assets/placeholder.svg"}
        className="post-card__user-avatar"
      />
    </Link>
  );
};
