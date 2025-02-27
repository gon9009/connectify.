import {
  createUserAccount,
  signInAccount,
  signOutAccount,
  likePost,
  savePost,
  deleteSavedPost,
  getCurrentUser,
  getRecentPosts
} from "../appwrite/api";

import { useMutation ,useQueryClient,useQuery} from "@tanstack/react-query";
import { NewUser } from "../../types/types";

// ============================================ 가입 / 인증 쿼리 ==================================================================

// 회원가입 mutation
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: NewUser) => createUserAccount(user),
    onSuccess: () => {
      console.log("회원가입 성공!")
    }
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
  return useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
  });
};

// ====================================== 게시물(post) 쿼리 ==============================================================================
export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: ["getRecentPosts"],
    queryFn: getRecentPosts,
  });
};

//===================================================================================

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

