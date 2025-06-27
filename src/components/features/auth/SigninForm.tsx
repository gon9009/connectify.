import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninFormData, SigninValidation } from "../../../lib/validation/auth";
import { Input, Label, Button } from "@/components/ui";
import { LOGIN_FIELDS, LOGIN_META } from "../../../constants/formField";

interface SigninFormProps {
  onSubmit: (data: SigninFormData) => void;
  isPending: boolean;
  errorMsg: string;
}

export const SigninForm = ({
  onSubmit,
  isPending,
  errorMsg,
}: SigninFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(SigninValidation),
  });

  return (
    <>
      <div className="logo">
        <img
          src="/assets/logo.png"
          alt="Connectify 로고"
          className="logo__image"
        />
      </div>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        {/* 폼 상단 */}
        {LOGIN_FIELDS.map((field) => (
          <div key={field.name} className="auth-form__container">
            <Label htmlFor={field.name} variant="auth">
              {field.label}
            </Label>
            <Input
              id={field.name}
              type={field.type}
              variant="auth"
              placeholder={`${field.label}을 입력해주세요`}
              {...register(field.name)}
              error={errors[field.name]?.message}
            />
            {errorMsg && <p className="input__error-msg">{errorMsg}</p>}
          </div>
        ))}
        <div className="auth-form__container">
          <div className="auth-form__btn-container">
          <Button type="submit" variant="auth">
            {isPending ? "로그인 중..." : LOGIN_META.buttonText}
          </Button>
          <Button
            onClick={() =>
              onSubmit({ email: "test12345@demo.com", password: "Test!@345" })
            }
            disabled={isPending}
            type="button"
            variant="test"
          >
            {isPending ? "테스트 계정 로그인중..." : "테스트 계정으로 로그인"}
          </Button>
          </div>
        </div>
      </form>
      <p className="auth-form__description">
        {LOGIN_META.description}
        <Link className="auth-form__description-link" to={LOGIN_META.link}>
          {LOGIN_META.linkText}
        </Link>
      </p>
    </>
  );
};
