type EmptyStateProps = {
  message: string;
};
// GridPostList 내부
const EmptyState = ({ message = "" }: EmptyStateProps) => {
  return <div className="empty-msg">{message}</div>;
};

export default EmptyState;
