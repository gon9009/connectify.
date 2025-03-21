import { useLikePost } from "../lib/react-query/queries";

// 게시물 "좋아요" 기능 커스텀 훅
export const useLikePostHandler = (
  postId: string,
  userId: string,
  usersWhoLiked: string[]
) => {
  const { mutate: likePost } = useLikePost();

  // 사용자가 게시물(Card) 에 좋아요를 눌렀는지 확인 
  const isUserLiked = usersWhoLiked.includes(userId);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    // 좋아요 상태 토글 
    const newLikes = isUserLiked
      ? usersWhoLiked.filter((id) => id !== userId) // 좋아요 취소
      : [...usersWhoLiked, userId]; // 좋아요 추가


    // 나중에 onSuccess,onError 토스트 메시지 추가
    likePost(
      { postId, likesArray: newLikes }
    );
  };

  return { isUserLiked, likesCount: usersWhoLiked.length, handleLikePost };
};

