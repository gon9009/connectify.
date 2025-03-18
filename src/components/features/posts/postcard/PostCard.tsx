import { useUserContext } from "../../../../context/AuthContext";
import { Post } from "../../../../types/types";
import PostStats from "../PostStats";
import useLikePostHandler from "../../../../hooks/useLikePostHandler";
import useSavePostHandler from "../../../../hooks/useSavePostHandler";
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
  showUser?: boolean; // 추가
  showStats?: boolean; // 추가
};

export type PostVariant = "" | "detail" | "compact";

const PostCard = ({
  post,
  isDetail = false,
  handleDelete,
  variant = "",
  showUser = true, // 기본값 추가
  showStats = true,
}: PostCardProps) => {
  const { user } = useUserContext();

  console.log(post);
  console.log(post.$id);

  // "프로필"로 접근했다면 post.creator.$id 를 반환 !
  // 그러나 "저장됨"으로 접근했다면 post.creator.$id 를 반환하지 않고 오류 발생 !
  // "컨텍스트" 에 따른 소유자 체크 로직 검사 필요 !

  const userId = user.id;
  // 컨텍스트에 따른 소유자 체크 로직
  const isPostOwner = useMemo(() => {
    // saved 탭에서 접근한 경우
    if (!post.creator) {
      return user.id === post.$id;
    }
    // 프로필이나 일반 포스트에서 접근한 경우
    return user.id === post.creator.$id;
  }, [user.id, post]);

  // 컨텍스트에 따른 좋아요 상태
  const initialLikes = useMemo(
    // 프로필의 liked/saved 탭에서는 빈 배열 반환
    () => {
      if (!post.likes) return [];
      return post.likes.map((user) => user.$id);
    },
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
    creatorImageUrl: post.creator?.imageUrl || user.imageUrl,
    creatorId: post.creator?.$id || post.$id,
    creatorName: post.creator?.name || user.name,
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
