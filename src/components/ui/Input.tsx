import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, type = "text", placeholder, className, error, ...rest },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <input
          ref={ref}
          type={type}
          id={id}
          placeholder={placeholder}
          className={`input ${className || ""}`}
          {...rest}
        />
        {error && <p className="error-msg">{error}</p>}
      </>
    );
  }
);

export default Input;
