interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "auth";
}

export const Label = ({ htmlFor, children, variant = "default" }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={`label label--${variant}`}>
      {children}
    </label>
  );
};

