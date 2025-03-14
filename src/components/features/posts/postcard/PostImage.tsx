import { Link } from "react-router-dom";
import { PostVariant } from "./PostCard";

export type PostImageProp = {
  imageUrl: string;
  postId: string;
  variant?:PostVariant
};

export const PostImage = ({ imageUrl, postId }: PostImageProp) => {
  return (
    <Link to={`/posts/${postId}`}>
      <img
        src={imageUrl || "/assets/placeholder.svg"}
        className="post-card__img"
        alt="Post Image"
      />
    </Link>
  );
};
