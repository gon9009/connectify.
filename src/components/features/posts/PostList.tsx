import { Post } from "../../../types";
import { PostCardCompact } from "@/components/features/posts/postcard/variants/PostCardCompact";

type GridPostListProps = {
  posts: Post[];
};

// compact 형식으로 카드를 렌더링 한다
export const GridPostList = ({ posts }: GridPostListProps) => {
  return (
    <ul className="grid-posts">
      {posts.map((post, index) => (
        <li key={post.$id}>
          <PostCardCompact
            // 그리드 형식에서는 3개까지 우선순위로
            isPriority={index < 6}
            post={post}
          />
        </li>
      ))}
    </ul>
  );
};

