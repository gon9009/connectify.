import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormData, SignupValidation } from "../../../lib/validation/auth";
import { Input, Label, Button } from "@/components/ui";
import { REGISTER_FIELDS, REGISTER_META } from "../../../constants/formField";

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
  isPending: boolean;
}

export const SignupForm = ({ onSubmit, isPending }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupValidation),
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
        {REGISTER_FIELDS.map((field) => (
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
          </div>
        ))}
        <div className="auth-form__container">
          <Button type="submit" variant="auth">
            {isPending ? "회원가입중..." : REGISTER_META.buttonText}
          </Button>
        </div>
      </form>
      <p className="auth-form__description">
        {REGISTER_META.description}
        <Link className="auth-form__description-link" to={REGISTER_META.link}>
          {REGISTER_META.linkText}
        </Link>
      </p>
    </>
  );
};
