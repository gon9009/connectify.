import { useOutletContext } from "react-router-dom";
import GridPostList from "../../../components/features/posts/PostList";
import Loader from "../../../components/ui/Loader";
import EmptyState from "../../../components/features/posts/EmptyState";
import PostListContainer from "../../../components/features/posts/PostListContainer";

const LikedPosts = () => {
  const { liked, isProfileOwner, isLoading } = useOutletContext();

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

  if (liked.length === 0) {
    return (
      <PostListContainer>
        <EmptyState message="좋아요한 게시물이 없습니다" />
      </PostListContainer>
    );
  }

  return (
    <PostListContainer>
      <GridPostList posts={liked} />
    </PostListContainer>
  );
};

export default LikedPosts;
