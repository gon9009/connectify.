import { SignupFormData,SigninFormData } from "../lib/validation/auth";

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
