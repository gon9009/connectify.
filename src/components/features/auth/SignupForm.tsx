import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormData, SignupValidation } from "../../../lib/validation/auth";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import Button from "../../ui/Button";
import logo from "../../../assets/logo.png";
import { REGISTER_FIELDS, REGISTER_META } from "../../../constants/formField";

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupValidation),
  });

  return (
    <>
      <img src={logo} alt="Connectify 로고" className="auth-container__logo" />
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        {REGISTER_FIELDS.map((field) => (
          <div key={field.name} className="auth-form__container">
            <Label htmlFor={field.name} className="auth-form__label">
              {field.label}
            </Label>
            <Input
              id={field.name}
              type={field.type}
              placeholder={`${field.label}을 입력해주세요`}
              className={`auth-form__input ${
                errors[field.name] ? "error" : ""
              }`}
              {...register(field.name)}
              error={errors[field.name]?.message}
            />
          </div>
        ))}
        <div className="auth-form__container">
          <Button type="submit" className="auth-form__btn">
            {REGISTER_META.buttonText}
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

export default SignupForm;
