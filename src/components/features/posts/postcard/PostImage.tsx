import { Link } from "react-router-dom";
 import { LazyLoadImage } from "react-lazy-load-image-component";
 import { PostVariant } from "@/types";
import "react-lazy-load-image-component/src/effects/blur.css";

export type PostImageProp = {
  imageUrl: string;
  postId: string;
  variant?: PostVariant;
  isPriority: boolean;
};

export const PostImage = ({ imageUrl, postId, isPriority }: PostImageProp) => {
  // 우선순위가 true 일 경우 레이지 로딩에서 제외시킨다 (일반적인 로딩)
  if (isPriority) {
    return (
      <Link to={`/posts/${postId}`}>
        <img
          src={imageUrl || "/assets/placeholder.svg"}
          alt="Post Image"
          className="post-card__img"
          loading="eager"
          fetchPriority="high"
        />
      </Link>
    );
  } else {
    return (
      <Link to={`/posts/${postId}`}>
        <LazyLoadImage
          src={imageUrl || "/assets/placeholder.svg"}
          alt="Post Image"
          className="post-card__img"
          effect="blur"
        />
      </Link>
    );
  }
};
