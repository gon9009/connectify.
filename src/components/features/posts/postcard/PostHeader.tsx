import { PostUserAvatar, PostUserAvatarProp } from "./PostUserAvatar"; // named 이므로
import { PostInfo, PostInfoProp } from "./PostInfo";
import { PostVariant } from "./PostCard";
import PostActions from "./PostActions";

type PostHeaderProp = PostUserAvatarProp &
  PostInfoProp &
  PostEditButtonProp & {
    isPostOwner: boolean;
    isDetail?: boolean; // 선택적 prop
    handleDeletePost?: () => void; // 선택적 prop
    variant?: PostVariant; // ✅ 명확한 타입 지정
  };
const PostHeader = ({
  creatorId,
  creatorImageUrl,
  creatorName,
  createdAt,
  location,
  postId,
  isPostOwner,
  isDetail = false,
  handleDeletePost,
  variant,
}: PostHeaderProp) => {
  return (
    <div className="post-card__header">
      <div className="post-card__user">
        <PostUserAvatar
          creatorId={creatorId}
          creatorImageUrl={creatorImageUrl}
        />
        <PostInfo
          creatorName={creatorName}
          createdAt={createdAt}
          location={location}
          variant={variant}
        />
      </div>
      <PostActions
        postId={postId}
        isPostOwner={isPostOwner}
        isDetail={isDetail}
        handleDeletePost={handleDeletePost}
      />
    </div>
  );
};

export default PostHeader; // default export
