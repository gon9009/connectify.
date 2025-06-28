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

// 디테일 카드
export function PostCardDetail({
  post,
  isPriority = false,
  onDelete,
}: PostCardDetailProps) {
  const { headerProps, contentProps, imageProps, statsProps } =
    usePostCardProps(post);
    
  return (
    <BasePostCard
      left={<PostImage {...imageProps} isPriority={isPriority} />}
      right={
        <>
          <div className="post-card__content-wrapper">
            <PostHeader {...headerProps} isDetail handleDelete={onDelete} />
            <Divider postType="detail" />
            <PostContent {...contentProps} />
          </div>
          <PostStats {...statsProps} />
        </>
      }
      className="post-card--detail"
    />
  );
}




