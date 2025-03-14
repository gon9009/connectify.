import { useOutletContext } from "react-router-dom";
import GridPostList from "../../../components/features/posts/PostList";
import Loader from "../../../components/ui/Loader";

const LikedPosts = () => {
  const { liked, isProfileOwner, isLoading } = useOutletContext();

  if (!isProfileOwner) {
    return <p>접근 권한이 없습니다</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (liked.length === 0) {
    return <p>좋아요한 게시물이 없습니다!</p>;
  }

  return (
    <>
      <GridPostList posts={liked} showStats={false} />
    </>
  );
};

export default LikedPosts;
