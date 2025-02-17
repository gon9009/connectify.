import z from "zod";

// 회원가입 유효성 검증
export const SignupValidation = z.object({
  name: z
    .string()
    .min(3, { message: "이름은 최소 3글자 이상이어야 합니다" })
    .max(50, { message: "이름이 너무 깁니다" })
    .regex(/^[가-힣a-zA-Z\s]+$/, {
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


export type SignupFormData = z.infer<typeof SignupValidation>;
export type SigninFormData = z.infer<typeof SigninValidation>;