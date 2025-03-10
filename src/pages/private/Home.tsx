import Loader from "../../components/ui/Loader";
import PostCard from "../../components/features/posts/PostCard";
import { useGetRecentPosts } from "../../lib/react-query/queries";

// 포스트 목록 컴포넌트
const PostList = ({
  posts,
  isLoading,
}: {
  posts?: Post[];
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <ul className="home__post-list">
      {posts?.map((post) => (
        <li key={post.$id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
};

const Home = () => {
  const { data: postsData, isLoading: isPostLoading } = useGetRecentPosts();

  if (isPostLoading) {
    return <Loader />;
  }

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__posts">
          <PostList posts={postsData?.documents} isLoading={isPostLoading} />
        </div>
      </div>
    </div>
  );
};

export default Home;
