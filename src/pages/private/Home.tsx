import Loader from "../../components/ui/Loader";
import PostCard from "../../components/features/posts/PostCard";
import UserCard from "../../components/features/user/UserCard";
import { useGetRecentPosts, useGetUsers } from "../../lib/react-query/queries";
import { useUserContext } from "../../context/AuthContext";

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

  return (
    <ul className="home__user-list">
      {users?.map((user) => (
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

  // Post 구조 확인
  console.log("useGetUsers 의 반환 정보:", JSON.stringify(creatorsData, null, 2));

  // 에러 처리
  if (isErrorCreators || isErrorPosts) {
    return <p>Error</p>;
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
