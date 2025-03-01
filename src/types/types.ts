import { SignupFormData,SigninFormData } from "../lib/validation/auth";
import { Models } from "appwrite";

// ============== 인증 관련 타입 =============================================
export type SidebarNavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type UpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type NewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type UpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type ContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isLoading: boolean;
  checkAuth: () => Promise<boolean>;
};

export type NewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

// ==== 폼(form) 관련 타입 =======================================
export interface Field {
  name: string;
  label: string;
  type: string;
}

export interface SignupField {
  name: keyof SignupFormData;
  label: string;
  type: string;
}

export interface SigninField {
  name: keyof SigninFormData;
  label: string;
  type: string;
}

export interface AuthMeta {
  buttonText: string;
  description: string;
  link: string;
  linkText: string;
}

// ----- 포스트 관련 타입 ------------------

export type Post = Models.Document & {
  $id: string;
  creator: {
    $id: string; // 유저 고유 ID (Users 컬렉션과 연결)
    name: string; // 유저 이름
    imageUrl?: string; // 유저 프로필 이미지 (선택적)
  };
  likes: { $id: string }[]; // 🔥 관계(Relationship) 필드이므로 객체 배열!
  caption: string; // 게시물 내용
  tags: string[]; // 태그 리스트
  imageUrl: string; // 게시물 이미지 URL
  imageId: string; // 이미지 파일의 고유 ID
  location?: string; // 위치 정보 (선택적)
  save?: { $id: string }; // 🔥 관계(Relationship) 데이터이므로 객체 형태
};


