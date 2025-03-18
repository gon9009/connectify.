import { useState, useEffect, useMemo } from "react";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useSavePost,
} from "../lib/react-query/queries";

// 게시물 저장기능 커스텀 훅
const useSavePostHandler = (postId: string, userId: string) => {
  const [isSaved, setIsSaved] = useState(false);
  const { data: currentUser } = useGetCurrentUser();
  // 새로운 게시물을 저장, 기존에 저장된 게시물을 삭제
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  // 사용자가 현재 게시물을 저장(Saved)했는지 확인하기 위한 함수
  const savedPostRecord = useMemo(
    () => currentUser?.save.find((record) => record.post.$id === postId),
    [currentUser?.save, postId]
  );

  // isSaved 상태 초기화/ 최신상태로 유지하기 위해 사용
  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [savedPostRecord]);

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
        { userId, postId },
        {
          onSuccess: () => setIsSaved(true),
        }
      );
    }
  };

  return { isSaved, handleSavePost };
};
export default useSavePostHandler;
