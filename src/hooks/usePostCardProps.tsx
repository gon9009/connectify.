import { useMemo } from "react";
import { useUserContext } from "../context/AuthContext";
import { Post } from "@/types/index";
import { useLikePostHandler } from "./useLikePostHandler";
import { useSavePostHandler } from "./useSavePostHandler";

// 1) 소유자 여부 판단만 분리
function isPostOwner(post: Post, userId: string) {
  return userId === (post.creator?.$id ?? post.$id);
}

// 2) 좋아요 ID 추출만 분리
function getUsersWhoLiked(post: Post) {
  return post.likes?.map((u) => u.$id) ?? [];
}

// 게시물(Post) 데이터를 기반으로 PostCard 컴포넌트가 필요로 하는 여러 UI 관련 props를 가공해서 반환하는 커스텀 훅
export const usePostCardProps = (post: Post) => {
  const { user } = useUserContext();
  const userId = user.id;

  const owner = useMemo(
    () => isPostOwner(post, userId),
    [post.$id, post.creator?.$id, userId]
  );
  const likedUsers = useMemo(() => getUsersWhoLiked(post), [post.likes]);

  const { isSaved, handleSavePost } = useSavePostHandler(post.$id, userId);
  const { isUserLiked, handleLikePost, likesCount } = useLikePostHandler(
    post.$id,
    userId,
    likedUsers
  );

  return {
    headerProps: {
      creatorImageUrl: post.creator?.imageUrl ?? user.imageUrl,
      creatorId: post.creator?.$id ?? post.$id,
      creatorName: post.creator?.name ?? user.name,
      createdAt: post.$createdAt,
      location: post.location,
      postId: post.$id,
      isPostOwner: owner,
    },
    contentProps: {
      caption: post.caption,
      tags: post.tags,
      postId: post.$id,
    },
    statsProps: {
      isSaved,
      handleSavePost,
      isUserLiked,
      handleLikePost,
      likesCount,
    },
    imageProps: {
      postId: post.$id,
      imageUrl: post.imageUrl,
    },
  };
};
