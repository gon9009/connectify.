import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninFormData, SigninValidation } from "../../../lib/validation/auth";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import Button from "../../ui/Button";
import logo from "../../../assets/logo.png";
import { LOGIN_FIELDS, LOGIN_META } from "../../../constants/auth";

interface SigninFormProps {
  onSubmit: (data: SigninFormData) => void;
}

const SigninForm = ({ onSubmit }: SigninFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(SigninValidation),
  });

  return (
    <>
      <img src={logo} alt="Connectify 로고" className="auth-container__logo" />
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        {LOGIN_FIELDS.map((field) => (
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
            {LOGIN_META.buttonText}
          </Button>
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

export default SigninForm;
