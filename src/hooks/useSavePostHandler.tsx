import { useMemo } from "react";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useSavePost,
} from "../lib/react-query/queries";

// 게시물 저장기능 커스텀 훅
export const useSavePostHandler = (postId: string, userId: string) => {
  const { data: currentUser } = useGetCurrentUser();
  const { mutate: savePost } = useSavePost(); // 게시물 저장
  const { mutate: deleteSavePost } = useDeleteSavedPost(); // 저장된 게시물 삭제

  // 사용자가 현재 게시물을 저장(Saved)했는지 확인하기 위한 함수
  const savedPostRecord = useMemo(
    () => currentUser?.save.find((record) => record.post.$id === postId),
    [currentUser?.save, postId]
  );
  const isSaved = Boolean(savedPostRecord);
  
  // 저장 핸들러
  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (savedPostRecord) {
      deleteSavePost(savedPostRecord.$id);
    } else {
      savePost({ userId, postId });
    }
  };

  return { isSaved, handleSavePost };
};
