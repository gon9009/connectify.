import { usePostCardProps } from "@/hooks/usePostCardProps";
import {
  PostHeader,
  PostImage,
  PostContent,
  PostStats,
  Divider,
} from "@/components/features/posts";
import { BasePostCard } from "@/components/features/posts/postcard/BasePostCard";
import { PostCardDetailProps } from "@/types/index";

export function PostCardDetail({
  post,
  isPriority = false,
  onDelete,
}: PostCardDetailProps) {
  const { headerProps, contentProps, imageProps, statsProps } =
    usePostCardProps(post);

  return (
    <BasePostCard
      header={<PostHeader {...headerProps} isDetail handleDelete={onDelete} />}
      image={<PostImage {...imageProps} isPriority={isPriority} />}
      content={
        <>
          <Divider postType="detail" />
          <PostContent {...contentProps} />
        </>
      }
      stats={<PostStats {...statsProps} />}
      className="post-card--detail"
    />
  );
}
