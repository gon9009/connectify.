import { SigninField, SignupField,AuthMeta } from "../types/types";

// 회원가입 필드 Field 타입의 요소만 포함 가능
export const REGISTER_FIELDS: SignupField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name:"username",
    label:"Username",
    type:"text"
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

// 회원가입 메타 정보
export const REGISTER_META: AuthMeta = {
  buttonText: "회원가입",
  description: "이미 계정이 있으신가요?",
  link: "/sign-in",
  linkText: "로그인",
};

// 로그인 필드, Field 타입의 요소만 포함 가능능
export const LOGIN_FIELDS: SigninField[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

// 로그인 메타 정보
export const LOGIN_META: AuthMeta = {
  buttonText: "로그인",
  description: "계정이 없으신가요?",
  link: "/sign-up",
  linkText: "회원가입",
};
