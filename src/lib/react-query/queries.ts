import {
  createUserAccount,
  signInAccount,
  signOutAccount,
} from "../appwrite/api";

import { useMutation } from "@tanstack/react-query";
import { NewUser } from "../../types/types";

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
export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};
