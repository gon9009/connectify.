import { Post } from "../../../../types/types";
import PostStats from "../PostStats";
import { usePostCardProps } from "../../../../hooks/usePostCardProps";
import PostHeader from "./PostHeader"; // default import
import { PostContent } from "./PostContent";
import { PostImage } from "./PostImage";
import { Divider } from "../Divider";
import {
  HeaderProps,
  ContentProps,
  StatsProps,
  ImageProps,
} from "../../../../hooks/usePostCardProps";

// PostCard 타입
type PostCardProps = {
  post: Post;
  isDetail?: boolean;
  handleDelete?: () => void;
  variant?: PostVariant;
  isPriority: boolean;
};

export type PostVariant = "" | "detail" | "compact";

// 디테일 카드 타입
type DetailPostCardProps = {
  headerProps: HeaderProps;
  contentProps: ContentProps;
  statsProps: StatsProps;
  imageProps: ImageProps;
} & Pick<PostCardProps, "isDetail" | "handleDelete" | "isPriority">;

// 리스트 카드 타입
type CompactPostCardProps = {
  imageProps: ImageProps;
} & Pick<PostCardProps, "isPriority">;

// 기본 카드 타입
type BasePostCardProps = {
  headerProps: HeaderProps;
  contentProps: ContentProps;
  statsProps: StatsProps;
  imageProps: ImageProps;
} & Pick<PostCardProps, "isPriority">;

// 디테일 카드 (isDetail,handleDelete 포함)
const DetailPostCard = ({
  headerProps,
  contentProps,
  statsProps,
  imageProps,
  handleDelete,
  isDetail,
  isPriority,
}: DetailPostCardProps) => {
  return (
    <div className="post-card post-card--detail">
      <div className="post-card__left">
        <PostImage isPriority={isPriority} {...imageProps} />
      </div>
      <div className="post-card__right">
        <div className="post-card__content-wrapper">
          <PostHeader
            isDetail={isDetail}
            handleDelete={handleDelete}
            {...headerProps}
          />
          <Divider postType="detail" />
          <PostContent {...contentProps} />
        </div>
        <PostStats {...statsProps} />
      </div>
    </div>
  );
};

// 리스트 카드
const CompactPostCard = ({ imageProps, isPriority }: CompactPostCardProps) => {
  return (
    <div className="post-card post-card--compact">
      <PostImage isPriority={isPriority} {...imageProps} />
    </div>
  );
};

// 기본 카드
const BasePostCard = ({
  headerProps,
  contentProps,
  imageProps,
  statsProps,
  isPriority,
}: BasePostCardProps) => {
  return (
    <div className="post-card">
      <PostHeader {...headerProps} />
      <PostContent {...contentProps} />
      <PostImage isPriority={isPriority} {...imageProps} />
      <PostStats {...statsProps} />
    </div>
  );
};

const PostCard = (props: PostCardProps) => {
  const { headerProps, contentProps, statsProps, imageProps } =
    usePostCardProps(props.post);

  switch (props.variant) {
    case "detail":
      return (
        <DetailPostCard
          // 원본 props 전달
          {...props}
          isPriority={props.isPriority}
          headerProps={headerProps}
          contentProps={contentProps}
          statsProps={statsProps}
          imageProps={imageProps}
        />
      );
    case "compact":
      return (
        <CompactPostCard
          {...props}
          isPriority={props.isPriority}
          imageProps={imageProps}
        />
      );
    default:
      return (
        <BasePostCard
          {...props}
          isPriority={props.isPriority}
          headerProps={headerProps}
          contentProps={contentProps}
          statsProps={statsProps}
          imageProps={imageProps}
        />
      );
  }
};

export default PostCard;
