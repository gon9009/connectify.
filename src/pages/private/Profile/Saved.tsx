import { Loader } from "@/components/ui";
import { useOutletContext } from "react-router-dom";
import { GridPostList,EmptyState,PostListContainer} from "@/components/features/posts";

const Saved = () => {
  // creator 를 반환하는 쿼리 찾기
  const { save, isProfileOwner, isLoading } = useOutletContext();

  // 프로필 소유자가 아닌 경우에는 해당 페이지를 볼수 없도록 처리 
  if (!isProfileOwner) {
    return (
      <PostListContainer>
        <EmptyState message="이 페이지는 해당 프로필의 사용자만 볼 수 있습니다" />
      </PostListContainer>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (save.length === 0) {
    return (
      <PostListContainer>
        <EmptyState message="저장된 게시물이 없습니다" />
      </PostListContainer>
    );
  }
  return <GridPostList posts={save?.map((saveItem) => saveItem.post)} />;
};

export default Saved;
