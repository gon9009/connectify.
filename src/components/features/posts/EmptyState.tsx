type EmptyStateProps = {
  message: string;
};
// GridPostList 내부
export const EmptyState = ({ message = "" }: EmptyStateProps) => {
  return <div className="empty-msg">{message}</div>;
};

