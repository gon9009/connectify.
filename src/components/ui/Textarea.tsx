import React, { forwardRef } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, className = "", ...props }, ref) => {
    return <textarea id={id} ref={ref} className={`textarea ${className}`} {...props} />;
  }
);

export default Textarea;
