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
  isLiked: boolean;
  likesCount: number;
  handleSavePost: (e: React.MouseEvent<HTMLImageElement>) => void;
  handleLikePost: (e: React.MouseEvent<HTMLImageElement>) => void;
};

// imageProps 타입 정의
export type ImageProps = {
  postId: string;
  imageUrl: string;
};

export const usePostCardProps = (post: Post) => {
  const { user } = useUserContext();

  // "프로필" 접근 -> post.creator.$id 를 반환, "저장됨 접근" -> post.$id 반환
  // "컨텍스트" 에 따른 소유자 체크 로직 검사 필요
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
  // 좋아요를 누른 사용자 ID 목록을 관리
  // 현재 사용자가 이 게시물에 좋아요 눌렀는지 확인하는데 사용
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
      isLiked,
      handleLikePost,
      likesCount,
    },
    imageProps: {
      postId: post.$id,
      imageUrl: post.imageUrl,
    },
  };
};
