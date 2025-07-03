import { Loader } from "@/components/ui";
import { useGetRecentPosts } from "../../lib/react-query/queries";
import { lazy, Suspense } from "react";
import { Post } from "@/types";

const PostCardBase = lazy(
  () => import("../../components/features/posts/postcard/variants/PostCardBase")
);

// 포스트 목록 컴포넌트
const PostList = ({
  posts,
  isLoading,
}: {
  posts: Post[];
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <Loader />;
  }

  // 첫 번쨰 카드만 Lazy 로딩 배제
  return (
    <ul className="home__post-list">
      {posts?.map((post, index) => (
        <li key={post.$id}>
          {index === 0 ? (
            <PostCardBase post={post} isPriority />
          ) : (
            <Suspense fallback={<Loader />}>
              <PostCardBase post={post} isPriority={false} />
            </Suspense>
          )}
        </li>
      ))}
    </ul>
  );
};

const Home = () => {
  const { data: posts = [], isLoading: isPostLoading } = useGetRecentPosts();

  if (isPostLoading) {
    return <Loader />;
  }

  console.log(posts);

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__header">
          <img src="/assets/home.svg" width={36} height={36} alt="home" />
          <h2 className="home__title">홈</h2>
        </div>
        <div className="home__posts">
          <PostList posts={posts} isLoading={isPostLoading} />
        </div>
      </div>
    </div>
  );
};

export default Home;
