import { SignupFormData,SigninFormData, PostFormData } from "../lib/validation/auth";
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

export interface PostFormField {
  name: keyof PostFormData;
  label:string;
  type:"text" | "textarea" | "file"; 
}

//  ============================= 포스트 관련 타입 ======================================================================

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

// 게시물 등록 타입 
export type CreatePostType = {
  userId: string; // ✅ 현재 로그인한 사용자 ID
  caption: string;
  file: File[];  // ✅ 업로드할 이미지 파일 (필수)
  location?: string;
  tags?: string; // 
};

// 게시물 수정 타입 
export type UpdatePostType = {
  postId: string; // ✅ 수정할 게시물의 ID
  caption: string;
  imageId: string;  
  imageUrl: string; 
  file?: File[];  // 선택적 (새로운 파일이 있을 경우만)
  location?: string;
  tags?: string; // 
};

// =============================================================== 유저(User) 타입 =======================

// 현재 유저 
export type CurrentUser = Models.Document & {
  accountId: string;
  bio: string | null;
  email: string;
  imageId: string | null;
  imageUrl: string;
  liked: Post[]; // liked가 문자열 배열 (좋아요한 게시물의 ID 배열)
  name: string;
  posts: Post[]; // posts가 문서 배열이라면
  save: string[]; // 저장한 게시물 ID 배열 (현재 빈 배열)
  username: string;
};
