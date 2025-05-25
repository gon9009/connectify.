import { useOutletContext } from "react-router-dom";
import GridPostList from "../../../components/features/posts/PostList";
import Loader from "../../../components/ui/Loader";
import EmptyState from "../../../components/features/posts/EmptyState";
import PostListContainer from "../../../components/features/posts/PostListContainer";

// Profile 에서 useOutletContext 로 데이터 전달
const ProfilePosts = () => {
  const { posts, isLoading } = useOutletContext();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PostListContainer>
      {posts.length === 0 ? (
        <EmptyState message="올린 게시물이 없습니다" />
      ) : (
        <GridPostList posts={posts} />
      )}
    </PostListContainer>
  );
};

export default ProfilePosts;
