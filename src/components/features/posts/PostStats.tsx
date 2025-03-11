
type PostStatsProps = {
  isSaved: boolean;
  handleSavePost: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  isLiked: boolean;
  handleLikePost: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  likesCount: number;
};

type LikeButton = {
  isLiked: boolean;
  handleLikePost: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  likesCount: number;
};

type SaveButton = {
  isSaved: boolean;
  handleSavePost: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
};

const SaveButton = ({ isSaved, handleSavePost }: SaveButton) => {
  return (
    <div className="post__stats-save">
      <img
        src={isSaved ? "/assets/saved.svg" : "/assets/save.svg"}
        alt="share"
        width={20}
        height={20}
        className="post__stats-save-icon"
        onClick={(e) => handleSavePost(e)}
      />
    </div>
  );
};

const LikeButton = ({ handleLikePost, isLiked, likesCount }: LikeButton) => {
  return (
    <div className="post__stats-like">
      <img
        src={isLiked ? "/assets/liked.svg" : "/assets/like.svg"}
        alt="like"
        width={24}
        height={24}
        onClick={(e) => handleLikePost(e)}
        className="post__stats-like-icon"
      />
      <p className="post__stats-like-count">{likesCount}</p>
    </div>
  );
};

// 개별 PostCard + 개별 PostStats
const PostStats = ({
  isSaved,
  handleSavePost,
  isLiked,
  handleLikePost,
  likesCount,
}: PostStatsProps) => {
  // 페이지에 따라 스타일링 변화
  const isProfilePage = location.pathname.startsWith("/profile");

  return (
    <div className={`post__stats ${isProfilePage}`}>
      <LikeButton
        isLiked={isLiked}
        handleLikePost={handleLikePost}
        likesCount={likesCount}
      />
      <SaveButton isSaved={isSaved} handleSavePost={handleSavePost} />
    </div>
  );
};

export default PostStats;
