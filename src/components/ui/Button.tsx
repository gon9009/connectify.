interface ButtonProps {
  children: React.ReactNode; 
  type?:  "submit" | "reset";
}

const Button = ({ children, type = "submit" }:ButtonProps) => {
  return (
    <button type={type} className="btn">
      {children}
    </button>
  );
};

export default Button;
