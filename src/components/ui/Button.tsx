interface ButtonProps {
  children: React.ReactNode;
  type?: "submit" | "reset";
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
