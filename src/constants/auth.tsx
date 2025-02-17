import { Field, AuthMeta } from "../types/auth";

// 회원가입 필드
// Field[] 타입은 Field 인터페이스의 배열을 의미
export const REGISTER_FIELDS: Field[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
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

// 로그인 필드
export const LOGIN_FIELDS: Field[] = [
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
