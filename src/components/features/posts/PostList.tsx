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
      {posts.map((post) => (
        <PostCard key={post.$id} post={post} variant="compact" />
      ))}
    </ul>
  );
};

export default GridPostList;
