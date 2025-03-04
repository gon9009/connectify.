import { ButtonHTMLAttributes } from "react";

// 버튼 속성 타입 
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// base 버튼 참조 
const Button = ({
  children,
  type = "submit",
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button onClick={onClick} type={type} className={`btn ${className || ""}`}>
      {children}
    </button>
  );
};

export default Button;
