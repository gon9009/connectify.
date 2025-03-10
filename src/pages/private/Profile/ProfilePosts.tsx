import { useOutletContext } from "react-router-dom";
import GridPostList from "../../../components/features/posts/PostList";
import Loader from "../../../components/ui/Loader";

// 사용자의 게시물 렌더링, isProfileOwner 체크 X 
const ProfilePosts = () => {
  const { posts,isLoading } = useOutletContext();

  if(isLoading) {
    return <Loader />
  }

  return <GridPostList posts={posts} showUser={false} />;
};

export default ProfilePosts;
