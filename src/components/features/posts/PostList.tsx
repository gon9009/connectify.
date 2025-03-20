import { Post } from "../../../types/types";
import PostCard from "./postcard/PostCard";

type GridPostListProps = {
  posts: Post[];
  showUser?: boolean;
  showStats?: boolean;
};

// 포스트 리스트
// compact 형식으로 카드를 렌더링 한다
const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  return (
    <ul className="grid-posts">
      {posts.map((post) => (
        <PostCard
          key={post.$id}
          post={post}
          showUser={showUser}
          showStats={showStats}
          variant="compact"
        />
      ))}
    </ul>
  );
};

export default GridPostList;
