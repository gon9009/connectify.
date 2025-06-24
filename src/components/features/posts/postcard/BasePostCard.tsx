import { BasePostCardProps } from "@/types/index";

// UI 표시만 담당,PostCardProps를 받아서 표시
export const BasePostCard = ({
  className = "",
  header,
  content,
  image,
  stats,
  actions,
}: BasePostCardProps) => {
  return (
    <div className={`post-card ${className || ""}`}>
      {header}
      {content}
      {image}
      {stats}
      {actions}
    </div>
  );
};

