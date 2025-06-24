import { usePostCardProps } from "@/hooks/usePostCardProps";
import { PostStats, PostHeader, PostImage, PostContent } from "@/components/features/posts";
import { BasePostCard } from "@/components/features/posts/postcard/BasePostCard";
import {PostCardBaseProps }from "@/types/index";

// 기본카드 
export function PostCardBase({ post, isPriority = false }: PostCardBaseProps) {
  
  const { headerProps, contentProps, imageProps, statsProps } = usePostCardProps(post);
  return (
    <BasePostCard
      header={<PostHeader {...headerProps} />}
      image={<PostImage {...imageProps} isPriority={isPriority} />}
      content={<PostContent {...contentProps} />}
      stats={<PostStats {...statsProps} />}
    />
  );
}