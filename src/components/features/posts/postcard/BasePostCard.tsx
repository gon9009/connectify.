import { BasePostCardProps } from "@/types/index";

// UI 표시만 담당,PostCardProps를 받아서 표시
export const BasePostCard = ({
  className = "",
  header,
  content,
  image,
  stats,
  actions,
  left,
  right,
}: BasePostCardProps) => {
  
  // left와 right가 모두 존재하는 경우, 레이아웃을 변경 (Detail 카드 형태로)
  if (left && right) {
    return (
      <div className={`post-card ${className || ""}`}>
        <div className="post-card__left">{left}</div>
        <div className="post-card__right">{right}</div>
      </div>
    );
  }

  // 컴팩트 카드 일때 
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

