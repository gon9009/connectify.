import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useUserContext } from "../../../context/AuthContext";
import { Post } from "../../../types/types";
import PostStats from "./PostStats";
import { useLikePostHandler } from "../../../hooks/useLikePostHandler";
import { useSavePostHandler } from "../../../hooks/useSavePosthandler";
import { useMemo } from "react";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type PostUserProps = Pick<Post, "creator" | "$createdAt" | "location">;
type PostEditButtonProps = Pick<Post, "$id"> & { isPostOwner: boolean };
type PostImageProps = Pick<Post, "$id" | "imageUrl" | "caption" | "tags">;

// ✅ 사용자 정보 (프로필 이미지, 이름, 날짜, 위치)
const PostUser = ({ creator, $createdAt }: PostUserProps) => {
  return (
    <div className="post-card__user">
      <Link to={creator.$id} className="post-card__user-link">
        <img
          width={48}
          height={48}
          src={creator.imageUrl || "/assets/placeholder.svg"}
          className="post-card__avatar"
        />
      </Link>
      <div className="post-card__user-details">
        <p className="post-card__username">{creator.name}</p>
        <div className="post-card__meta">
          <p className="post-card__date">{dayjs($createdAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

// ✅ 게시물 수정 버튼 (작성자만 표시)
const PostEditButton = ({ $id }: PostEditButtonProps) => {
  return (
    <Link to={`/edit/${$id}`} className="post-card__edit-button">
      <img width={24} height={24} src="/assets/edit.svg" alt="Edit Post" />
    </Link>
  );
};

// ✅ 게시물 본문 및 이미지
const PostImage = ({ $id, imageUrl, caption, tags }: PostImageProps) => {
  return (
    <Link to={`/posts/${$id}`}>
      <div className="post-card__content">
        <p>{caption}</p>
        <ul className="post-card__tags">
          {tags.map((tag, index) => (
            <li key={index}>#{tag}</li>
          ))}
        </ul>
      </div>
      <img
        src={imageUrl || "/assets/placeholder.svg"}
        className="post-card__img"
        alt="Post Image"
      />
    </Link>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  const { user } = useUserContext();
  const userId = user.id;
  const isPostOwner = user.id === post.creator.$id;
  const { isSaved, handleSavePost } = useSavePostHandler(post.$id, userId);

  // usememo 로 참조값 유지 
  const initialLikes = useMemo(
    () => post.likes.map((user) => user.$id),
    [post.likes]
  );
  
  const { isLiked, handleLikePost, likesCount } = useLikePostHandler(
    post.$id,
    userId,
    initialLikes
  );

  return (
    <div className="post-card">
      <div className="post-card__header">
        <PostUser creator={post.creator} $createdAt={post.$createdAt} />
        {isPostOwner && (
          <PostEditButton $id={post.$id} isPostOwner={isPostOwner} />
        )}
      </div>
      {/* 📌 게시물 본문 (이미지, 캡션, 태그) */}
      <PostImage
        $id={post.$id}
        imageUrl={post.imageUrl}
        caption={post.caption}
        tags={post.tags}
      />
      <PostStats
        isSaved={isSaved}
        handleSavePost={handleSavePost}
        isLiked={isLiked}
        handleLikePost={handleLikePost}
        likesCount={likesCount}
      />
    </div>
  );
};

export default PostCard;
