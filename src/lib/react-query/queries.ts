import {
  createUserAccount,
  signInAccount,
  signOutAccount,
  likePost,
  savePost,
  deleteSavedPost,
  getCurrentUser,
  getRecentPosts,
  getUsers,
  createPost,
  updatePost,
  getPostById,
  deletePost,
  getUserPosts,
  getUserById,
  updateUser,
} from "../appwrite/api";
import { Post, CurrentUser,ProfileUser } from "../../types/types";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  UpdateUserType,
  CreatePostType,
  NewUser,
  UpdatePostType,
} from "../../types/types";

// ============================================ 가입 / 인증 쿼리 ==================================================================

// 회원가입 mutation
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: NewUser) => createUserAccount(user),
    onSuccess: () => {
      console.log("회원가입 성공!");
    },
  });
};

// 로그인 mutation
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

// 로그아웃 mutation
export const useSignOutAccount = (options = {}) => {
  return useMutation({
    mutationFn: signOutAccount,
    ...options,
  });
};
// ====================================== 사용자(user) 쿼리 =================================================================================

export const useGetCurrentUser = () => {
  // 핸들러에서 반환 가능한 값
  return useQuery<CurrentUser | null>({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["getUsers"],
    queryFn: () => getUsers(),
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery<ProfileUser>({
    queryKey: [getUserById, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

// ====================================== 게시물(post) 쿼리 ==============================================================================
export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: ["getRecentPosts"],
    queryFn: getRecentPosts,
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => likePost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getPostById", data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: ["getRecentPosts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getPosts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCurrentUser"],
      });
    },
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
      savePost(userId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getRecentPosts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getPosts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCurrentUser"],
      });
    },
  });
};

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getRecentPosts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getPosts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCurrentUser"],
      });
    },
  });
};

export const useGetPostById = (postId?: string) => {
  return useQuery<Post>({
    queryKey: ["getUserPosts", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, imageId }: { postId?: string; imageId: string }) =>
      deletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getRecentPosts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserPosts"],
      });
    },
  });
};

export const useGetUserPosts = (userId?: string) => {
  return useQuery<Post[]>({
    queryKey: ["getUserPosts", userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });
};

// ========================================= 포스트 폼 (PostForm) 쿼리 ===============================================================

// 포스트 폼 게시물 생성시
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: CreatePostType) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getRecentPosts"],
      });
    },
  });
};

// 포스트 폼 게시물 수정시
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: UpdatePostType) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getPostById", data?.$id],
      });
    },
  });
};

// ========================================= 프로필 업데이트 쿼리 ========================================================export const useUpdateUser = () => {
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: UpdateUserType) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCurrentUser"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserById", data?.$id],
      });
    },
  });
};
