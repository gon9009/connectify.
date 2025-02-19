interface LoaderProps {
  size?: "small" | "medium" | "large";
}

const Loader = ({ size = "medium" }: LoaderProps) => {
  return (
    <div className={`loader loader--${size}`}>
      <div className="loader__spinner"></div>
    </div>
  );
};

export default Loader;
