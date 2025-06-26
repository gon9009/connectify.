import { usePostCardProps } from "@/hooks/usePostCardProps";
import { PostImage } from "@/components/features/posts";
import { BasePostCard } from "@/components/features/posts/postcard/BasePostCard";
import { PostCardCompactProps } from "@/types/index";

// 컴팩트 카드
export function PostCardCompact({
  post,
  isPriority = false,
}: PostCardCompactProps) {
  const { imageProps } = usePostCardProps(post);

  return (
    <BasePostCard
      image={<PostImage {...imageProps} isPriority={isPriority} />}
      className="post-card--compact"
    />
  );
}
