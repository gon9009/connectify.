import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { useUserContext } from "../../../context/AuthContext";
import { Post } from "../../../types/types";

type GridPostListProps = {
  posts: Post[];
  showUser?: boolean;
  showStats?: boolean;
};
type GridPostImageProps = Pick<Post, "$id" | "imageUrl">;
type GridUserInfoProps = Pick<Post, "creator">;
type GridPostItemProps = {
  post: Post; // ✅ Post 타입을 명시적으로 포함
  showUser: boolean;
  showStats: boolean;
  userId: string;
};

// 포스트 이미지 컴포넌트
const GridPostImage = ({ $id, imageUrl }: GridPostImageProps) => {
  return (
    <Link to={`/posts/${$id}`} className="grid-posts__item-link">
      <img src={imageUrl} alt="post" className="grid-posts__item-image" />
    </Link>
  );
};

// 사용자 정보 컴포넌트
const GridUserInfo = ({ creator }: GridUserInfoProps) => {
  const { imageUrl, name } = creator;
  return (
    <div className="grid-posts__user-info">
      <img
        width={32}
        height={32}
        src={imageUrl}
        alt="creator"
        className="grid-posts__user-avatar"
      />
      <p className="grid-posts__user-name">{name}</p>
    </div>
  );
};

// 포스트 아이템 (이미지 + 사용자 정보 + 좋아요/저장 버튼튼)
const GridPostItem = ({
  post,
  showUser,
  showStats,
  userId,
}: GridPostItemProps) => {
  return (
    <li className="grid-posts__item">
      <GridPostImage imageUrl={post.imageUrl} $id={post.$id} />
      <div className="grid-posts__info">
        {showUser && <GridUserInfo creator={post.creator} />}
        <div className="grid-posts__stats">
          {showStats && <PostStats post={post} userId={userId} />}
        </div>
      </div>
    </li>
  );
};

// 포스트 리스트
const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  console.log(posts);

  return (
    <ul className="grid-posts">
      {posts.map((post) => (
        <GridPostItem
          key={post.$id}
          post={post}
          showUser={showUser}
          showStats={showStats}
          userId={user?.id}
        />
      ))}
    </ul>
  );
};

export default GridPostList;
