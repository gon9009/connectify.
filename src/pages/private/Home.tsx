import Loader from "../../components/ui/Loader";
import PostCard from "../../components/features/posts/PostCard";
import UserCard from "../../components/features/user/UserCard";
import { useGetRecentPosts, useGetUsers } from "../../lib/react-query/queries";

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
    <ul>
      {posts?.map((post) => (
        <li key={post.$id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
};

// 사용자 목록 컴포넌트
const UserList = ({
  users,
  isLoading,
}: {
  users?: User[];
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <Loader />;
  }
  if (!users || users.length === 0) {
    return <p>No users found.</p>;
  }
  return (
    <ul>
      {users.map((user) => (
        <li key={user?.$id}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
};

const Home = () => {
  const {
    data: postsData,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creatorsData,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  // 에러 처리
  if (isErrorCreators || isErrorPosts) {
    return <p>Error</p>;
  }

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__posts">
          <h2 className="home__post-title">홈</h2>
          <PostList posts={postsData?.documents} isLoading={isPostLoading} />
        </div>
      </div>

      <div className="home__creators">
        <h3 className="home__creators-title">사용자</h3>
        <UserList users={creatorsData?.documents} isLoading={isUserLoading} />
      </div>
    </div>
  );
};

export default Home;
