import z from "zod";

// 프로필 수정 유효성 검증
export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "이름은 최소 2자 이상이어야 합니다." }),
  username: z
    .string()
    .min(2, { message: "사용자명은 최소 2자 이상이어야 합니다." }),
  email: z.string().email({ message: "올바른 이메일 형식을 입력하세요." }),
  bio: z.string(),
});

export type ProfileFormData = z.infer<typeof ProfileValidation>;
