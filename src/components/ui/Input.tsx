interface InputProps {
  children: React.ReactNode;
  type?: "text" | "password" | "email";
  palceholder?: string;
}

const Input = ({ children }: InputProps) => {
  return <input>{children}</input>;
};

export default Input;
