import { useOutletContext } from "react-router-dom";
import GridPostList from "../../../components/features/posts/PostList";
import Loader from "../../../components/ui/Loader";

// Profile 에서 useOutletContext 로 데이터 전달
const ProfilePosts = () => {
  const { posts, isLoading } = useOutletContext();


  if (isLoading) {
    return <Loader />;
  }

  return <GridPostList posts={posts} showUser={false} />;
};

export default ProfilePosts;
