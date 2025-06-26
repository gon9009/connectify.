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
            isPriority={index < 6}
            post={post}
          />
        </li>
      ))}
    </ul>
  );
};

