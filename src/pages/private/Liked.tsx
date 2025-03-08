import { useGetCurrentUser } from "../../lib/react-query/queries";
import GridPostList from "../../components/features/posts/PostList";
import Loader from "../../components/ui/Loader";

const LikedPosts = () => {
  const { data: currentUser, isLoading } = useGetCurrentUser();

  if (isLoading) {
    return <Loader />;
  }

  // null 값은 핸들러에서 처리할수 있도록 
  if (!currentUser) return <p>사용자 정보를 불러올 수 없습니다.</p>;

  if (currentUser.liked.length === 0) {
    return <p>좋아요한 게시물이 없습니다!</p>;
  }

  return (
    <>
      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
  );
};

export default LikedPosts;
