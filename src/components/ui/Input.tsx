import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  error?: string;
  variant: "default" | "auth";
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, type = "text", variant = "default", placeholder, error, ...rest },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <input
          ref={ref}
          type={type}
          id={id}
          placeholder={placeholder}
          className={`input input--${variant} ${error && "input--error"}`}
          {...rest}
        />
        {error && <p className="input__error-msg">{error}</p>}
      </>
    );
  }
);
