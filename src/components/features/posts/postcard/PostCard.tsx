import { useUserContext } from "../../../../context/AuthContext";
import { Post } from "../../../../types/types";
import PostStats from "../PostStats";
import { useLikePostHandler } from "../../../../hooks/useLikePostHandler";
import { useSavePostHandler } from "../../../../hooks/useSavePostHandler";
import { useMemo } from "react";
import PostHeader from "./PostHeader"; // default import
import { PostContent } from "./PostContent";
import { PostImage } from "./PostImage";
import { Divider } from "../Divider";

type PostCardProps = {
  post: Post;
  isDetail?: boolean;
  handleDelete?: () => void;
  variant?: PostVariant;
};

export type PostVariant = "" | "detail" | "compact";

const PostCard = ({
  post,
  isDetail = false,
  handleDelete,
  variant = "",
}: PostCardProps) => {
  const { user } = useUserContext();
  const userId = user.id;
  const isPostOwner = user.id === post.creator.$id;

  // usememo 로 참조값 유지
  const initialLikes = useMemo(
    () => post.likes.map((user) => user.$id),
    [post.likes]
  );
  const { isSaved, handleSavePost } = useSavePostHandler(post.$id, userId);
  const { isLiked, handleLikePost, likesCount } = useLikePostHandler(
    post.$id,
    userId,
    initialLikes
  );

  // 카드 헤더 Props
  const headerProps = {
    variant,
    creatorImageUrl: post.creator.imageUrl,
    creatorId: post.creator.$id,
    creatorName: post.creator.name,
    createdAt: post.$createdAt,
    location: post.location,
    postId: post.$id,
    isPostOwner,
    isDetail,
    handleDeletePost: isPostOwner ? handleDelete : undefined,
  };

  // 카드 콘텐츠 Props
  const contentProps = {
    variant,
    caption: post.caption,
    tags: post.tags,
    postId: post.$id,
  };

  // 카드 Stat Props
  const statsProps = {
    variant,
    isSaved,
    handleSavePost,
    isLiked,
    handleLikePost,
    likesCount,
  };

  // 상세 페이지 카드
  if (variant === "detail") {
    return (
      <div className="post-card post-card--detail">
        <div className="post-card__left">
          <PostImage postId={post.$id} imageUrl={post.imageUrl} />
        </div>
        <div className="post-card__right">
          <div className="post-card__content-wrapper">
            <PostHeader {...headerProps} />
            <Divider postType="detail" />
            <PostContent {...contentProps} />
          </div>

          <PostStats {...statsProps} />
        </div>
      </div>
    );
  }

  // 리스트 페이지 카드
  if (variant === "compact") {
    return (
      <div className="post-card post-card--compact">
        <PostHeader {...headerProps} />
        <PostImage postId={post.$id} imageUrl={post.imageUrl} />
      </div>
    );
  }

  // 기본카드 (Home)
  return (
    <div className="post-card">
      <PostHeader {...headerProps} />
      <PostContent {...contentProps} />
      <PostImage variant={variant} postId={post.$id} imageUrl={post.imageUrl} />
      <PostStats {...statsProps} />
    </div>
  );
};

export default PostCard;
