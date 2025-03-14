import { useUserContext } from "../../../context/AuthContext";
import { Post } from "../../../types/types";
import PostCard from "./postcard/PostCard";

type GridPostListProps = {
  posts: Post[];
  showUser?: boolean;
  showStats?: boolean;
};

// 포스트 리스트
const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-posts">
      {posts.map((post) => (
        <PostCard
          key={post.$id}
          post={post}
          showUser={showUser}
          showStats={showStats}
          userId={user?.id}
          variant="compact"
        />
      ))}
    </ul>
  );
};

export default GridPostList;
