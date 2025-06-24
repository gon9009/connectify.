import { Models } from "appwrite";
import { ReactNode } from "react";

export type Post = Models.Document & {
  $id: string;
  creator: {
    $id: string; // 유저 고유 ID (Users 컬렉션과 연결)
    name: string; // 유저 이름
    imageUrl?: string; // 유저 프로필 이미지 (선택적)
  };
  likes: { $id: string }[]; //  관계(Relationship) 필드이므로 객체 배열!
  caption: string;
  tags: string[];
  imageUrl: string;
  imageId: string;
  location?: string;
  save?: { $id: string };
};

// Variant 타입
export type PostVariant = "" | "detail" | "compact";

// PostCard 타입 / 외부에서 처음 받는 props 의 타입
export type PostCardProps = {
  post: Post;
  isDetail?: boolean;
  handleDelete?: () => void;
  variant?: PostVariant;
  isPriority: boolean;
};

// =============================== 카드 variant =================
export interface PostCardBaseProps {
  post: Post;
  isPriority?: boolean;
}
export interface PostCardCompactProps {
  post: Post;
  isPriority?: boolean;
}
export interface PostCardDetailProps {
  post: Post;
  isPriority?: boolean;
  onDelete: () => void;
}
//======================== Base 카드 ===============================

// UI 용타입
export type BasePostCardProps = {
  header?: ReactNode;
  content?: ReactNode;
  image?: ReactNode;
  stats?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

//=========================

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
