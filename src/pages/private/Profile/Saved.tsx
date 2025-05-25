import GridPostList from "../../../components/features/posts/PostList";
import Loader from "../../../components/ui/Loader";
import { useOutletContext } from "react-router-dom";
import EmptyState from "../../../components/features/posts/EmptyState";
import PostListContainer from "../../../components/features/posts/PostListContainer";

const Saved = () => {
  // creator 를 반환하는 쿼리 찾기
  const { save, isProfileOwner, isLoading } = useOutletContext();

  // <p>해당 페이지는 로그인한 사용자만 볼 수 있어요</p>
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
