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

type LikeButton = {
  isLiked: boolean;
  likes: string[];
  handleLikePost: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
};

type SaveButton = {
  isSaved: boolean;
  handleSavePost: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
};

// 개별 PostCard + 개별 PostStats
const PostStats = ({ post, userId }: PostStats) => {
  // 좋아요 누른 사용자 리스트 반환
  const likesList = post.likes.map((user) => user.$id);
  const location = useLocation();
  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();

  // 사용자가 현재 게시물을 저장(Saved)했는지 확인하기 위한 함수
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  // 사용자가 좋아요(Liked) 인지 확인
  const isLiked = likes.includes(userId);

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
      <LikeButton
        likes={likes}
        handleLikePost={handleLikePost}
        isLiked={isLiked}
      />
      <SaveButton isSaved={isSaved} handleSavePost={handleSavePost} />
    </div>
  );
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

const LikeButton = ({ likes, handleLikePost, isLiked }: LikeButton) => {
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
      <p className="post__stats-like-count">{likes.length}</p>
    </div>
  );
};

export default PostStats;



