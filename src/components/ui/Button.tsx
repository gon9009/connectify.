interface ButtonProps {
  children: React.ReactNode;
  type?: "submit" | "reset";
  className: string;
}

const Button = ({ children, type = "submit", className }: ButtonProps) => {
  return (
    <button type={type} className={`btn ${className || ""}`}>
      {children}
    </button>
  );
};

export default Button;
