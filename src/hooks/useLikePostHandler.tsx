import { useState, useEffect } from "react";
import { useLikePost } from "../lib/react-query/queries";

// 게시물 "좋아요" 기능 커스텀 훅
const useLikePostHandler = (
  postId: string,
  userId: string,
  initialLikes: string[]
) => {
  const [likes, setLikes] = useState<string[]>(initialLikes);
  const { mutate: likePost } = useLikePost();

  // 서버 - 로컬 동기화 useEFfect
  useEffect(() => {
    if (JSON.stringify(likes) !== JSON.stringify(initialLikes)) {
      setLikes(initialLikes);
    }
  }, [initialLikes]);

  // 사용자가 좋아요(Liked) 인지 확인
  const isLiked = likes.includes(userId);

  // 좋아요 동작 핸들러
  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const newLikes = isLiked
      ? likes.filter((id) => id !== userId) // 좋아요 취소
      : [...likes, userId]; // 좋아요 추가

    likePost(
      { postId, likesArray: newLikes },
      {
        onSuccess: () => {
          setLikes(newLikes);
        },
      }
    );
  };

  return { isLiked, likesCount: likes.length, handleLikePost };
};

export default useLikePostHandler;
