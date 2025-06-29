import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "default" | "auth" | "logout" | "mobile-logout" | "post" | "cancle" | "test" | "delete";
}

export const Button = ({
  children,
  type = "submit",
  variant = "default",
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`button button--${variant}`}
    >
      {children}
    </button>
  );
};
