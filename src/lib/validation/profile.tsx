import z from "zod";

// 프로필 수정 폼 유효성 검증 스키마
export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z
    .string()
    .min(2, "이름은 2자 이상이어야 합니다")
    .max(30, "이름은 30자를 초과할 수 없습니다"),
  username: z
    .string()
    .min(2, "사용자명은 2자 이상이어야 합니다")
    .max(30, "사용자명은 30자를 초과할 수 없습니다"),
  email: z.string().email({ message: "올바른 이메일 형식을 입력하세요." }),
  bio: z.string(),
});

export type ProfileFormData = z.infer<typeof ProfileValidation>;
