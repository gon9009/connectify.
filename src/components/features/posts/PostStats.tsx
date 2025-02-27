import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "../../../lib/react-query/queries";
import { Post } from "../../../types/types";

// 타입 명확히 할것
type PostStats = {
  post: Post;
  userId: string;
};

// 개별 PostCard + 개별 PostStats
const PostStats = ({ post, userId }: PostStats) => {
  const likesList = post.likes.map((user) => user.$id); 
  const location = useLocation();
  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();

  // 사용자가 현재 게시물을 저장했는지 확인하기 위한 함수
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  const checkIsLiked = (likeList: string[], userId: string) => {
    return likeList.includes(userId);
  };

  // isSaved 상태 초기화/ 최산상태로 유지하기 위해 사용
  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [savedPostRecord]);

  // 좋아요 동작 핸들러
  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const newLikes = likes.includes(userId)
      ? likes.filter((id) => id !== userId) // 좋아요 취소
      : [...likes, userId]; // 좋아요 추가

    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  // 저장 핸들러
  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (savedPostRecord) {
      deleteSavePost(savedPostRecord.$id, {
        onSuccess: () => setIsSaved(false),
      });
    } else {
      savePost(
        { userId, postId: post.$id },
        {
          onSuccess: () => setIsSaved(true),
        }
      );
    }
  };

  // 페이지에 따라 스타일링 변화
  const isProfilePage = location.pathname.startsWith("/profile");

  return (
    <div className={`post__stats ${isProfilePage}`}>
      <SaveButton isSaved={isSaved} handleSavePost={handleSavePost} />
      <LikeButton
        likes={likes}
        userId={userId}
        handleLikePost={handleLikePost}
        checkIsLiked={checkIsLiked}
      />
    </div>
  );
};

const SaveButton = ({ isSaved, handleSavePost }) => {
  return (
    <div className="post__stats-save">
      <img
        src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
        alt="share"
        width={24}
        height={24}
        className="post__stats-save-icon"
        onClick={(e) => handleSavePost(e)}
      />
    </div>
  );
};

const LikeButton = ({ likes, userId, handleLikePost, checkIsLiked }) => {
  return (
    <div className="post-stats__like">
      <img
        src={`${
          checkIsLiked(likes, userId)
            ? "/assets/icons/liked.svg"
            : "/assets/icons/like.svg"
        }`}
        alt="like"
        width={24}
        height={24}
        onClick={(e) => handleLikePost(e)}
        className="post-stats__like-icon"
      />
      <p className="post-stats__like-count">{likes.length}</p>
    </div>
  );
};

export default PostStats;
