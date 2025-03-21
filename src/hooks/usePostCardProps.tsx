import React, { useMemo } from "react";
import { useUserContext } from "../context/AuthContext";
import { Post } from "../types/types";
import { useLikePostHandler } from "./useLikePostHandler";
import { useSavePostHandler } from "./useSavePostHandler";

// headerProps 타입 정의
export type HeaderProps = {
  creatorImageUrl: string;
  creatorId: string;
  creatorName: string;
  createdAt: string;
  location?: string;
  postId: string;
  isPostOwner: boolean;
};

// contentProps 타입 정의
export type ContentProps = {
  caption: string;
  tags: string[];
  postId: string;
};

// statsProps 타입 정의
export type StatsProps = {
  isSaved: boolean;
  isUserLiked: boolean;
  likesCount: number;
  handleSavePost: (e: React.MouseEvent<HTMLImageElement>) => void;
  handleLikePost: (e: React.MouseEvent<HTMLImageElement>) => void;
};
// imageProps 타입 정의
export type ImageProps = {
  postId: string;
  imageUrl: string;
};

// /api/posts 로 접근할시 likes,creator 포함 
// /api/users/{userId}/saved 로 접근시 likes,creator 미포함 
export const usePostCardProps = (post: Post) => {
  const { user } = useUserContext();

  // "프로필" 접근 -> post.creator.$id 를 반환, "저장됨" 접근 -> post.$id 반환
  const userId = user.id;
  
  const isPostOwner = useMemo(() => {
    // saved 탭에서 접근한 경우 post.$id 가 동일 한지를 묻는다 
    if (!post.creator) {
      return user.id === post.$id;
    }

    // 프로필이나 일반 포스트에서 접근한 경우
    return user.id === post.creator.$id;
  }, [user.id, post]);


  // 좋아요를 누른 사용자 ID 목록을 관리
  const usersWhoLiked = useMemo(
    // 프로필의 liked/saved 탭에서는 빈 배열 반환
    () => {
      if (!post.likes) return [];
      return post.likes.map((user) => user.$id);
    },
    [post.likes]
  );

  const { isSaved, handleSavePost } = useSavePostHandler(post.$id, userId);
  const { isUserLiked, handleLikePost, likesCount } = useLikePostHandler(
    post.$id,
    userId,
    usersWhoLiked
  );

  return {
    headerProps: {
      creatorImageUrl: post.creator?.imageUrl || user.imageUrl,
      creatorId: post.creator?.$id || post.$id,
      creatorName: post.creator?.name || user.name,
      createdAt: post.$createdAt,
      location: post.location,
      postId: post.$id,
      isPostOwner,
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
