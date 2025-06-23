import { usePostCardProps } from "@/hooks/usePostCardProps";
import { PostImage, PostContent } from "@/components/features/posts";
import { BasePostCard } from "@/components/features/posts/postcard/BasePostCard";
import { PostCardCompactProps } from "@/types/index";

export function PostCardCompact({
  post,
  isPriority = false,
}: PostCardCompactProps) {
  const { contentProps, imageProps } = usePostCardProps(post);

  return (
    <BasePostCard
      image={<PostImage {...imageProps} isPriority={isPriority} />}
      content={<PostContent {...contentProps} />}
      className="post-card--compact"
    />
  );
}
