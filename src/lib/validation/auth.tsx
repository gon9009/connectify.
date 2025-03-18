import z from "zod";

// 회원가입 유효성 검증
export const SignupValidation = z.object({
  username: z
    .string()
    .min(3, { message: "Username은 최소 3글자 이상이어야 합니다." })
    .max(20, { message: "Username은 20글자를 넘을 수 없습니다." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username은 영문, 숫자, 그리고 밑줄(_)만 허용합니다.",
    }),
  name: z
    .string()
    .min(3, { message: "이름은 최소 3글자 이상이어야 합니다" })
    .max(50, { message: "이름이 너무 깁니다" })
    .regex(/^[가-힣a-zA-Z0-9\s]+$/, {
      message: "이름에 특수문자를 포함할 수 없습니다",
    }),
  email: z
    .string()
    .email({ message: "유효한 이메일을 입력해주세요." })
    .min(1, { message: "이메일은 필수 입력항목입니다" }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8글자 이상이어야 합니다." })
    .max(30, { message: "비밀번호는 30글자를 초과할 수 없습니다." })
    .regex(/^(?=.*[a-z])/, { message: "소문자를 포함해야 합니다." })
    .regex(/^(?=.*[A-Z])/, { message: "대문자를 포함해야 합니다." })
    .regex(/^(?=.*[0-9])/, { message: "숫자를 포함해야 합니다." }),
});

// 로그인 유효성 검증
export const SigninValidation = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8글자 이상이어야 합니다." }),
});

// PostForm 유효성 검증 
export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: "최소 5글자 이상이어야 합니다." })
    .max(2200, { message: "최대 2,200글자까지 가능합니다." }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(1, { message: "필수 입력 항목입니다." })
    .max(1000, { message: "최대 1000글자까지 가능합니다." }),
  tags: z.string(),
});

export type PostFormData = z.infer<typeof PostValidation>;
export type SignupFormData = z.infer<typeof SignupValidation>;
export type SigninFormData = z.infer<typeof SigninValidation>;
