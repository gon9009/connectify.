import { Post } from "../../../types/types";
import PostCard from "./postcard/PostCard";

type GridPostListProps = {
  posts: Post[];
};

// 포스트 리스트
// compact 형식으로 카드를 렌더링 한다
const GridPostList = ({ posts }: GridPostListProps) => {
  return (
    <ul className="grid-posts">
      {posts.map((post, index) => (
        <li key={post.$id}>
          <PostCard
            // 그리드 형식에서는 3개까지 우선순위로
            isPriority={index < 6}
            key={post.$id}
            post={post}
            variant="compact"
          />
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
