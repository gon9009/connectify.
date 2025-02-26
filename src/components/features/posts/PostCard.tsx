import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useUserContext } from "../../../context/AuthContext";

// Models. 는 내장 타입의 컬렉션들 
type Post = Models.Document & {
    creator: {
      $id: string;
      name: string;
      imageUrl?: string;
    };
    likes: string[]; 
    caption: string;
    tags: string[];
    imageUrl: string;
    imageId: string;
    location?: string;
    save: string;
  };

dayjs.locale("ko");
dayjs.extend(relativeTime);

const PostCard = ({ post }: Post) => {
  const { user } = useUserContext();
  return (
    <div className="post-card">
      {/* 포스트 카드 헤더 (유저 이미지,이름,생성날짜,위치) */}
      <div className="post-card__header">
        <div className="post-card__user">
          <Link
            to={`/profile/${post.creator.$id}`}
            className="post-card__user-link"
          >
            <img
              src={post.creator?.imageUrl || "/assets/placeholder.svg"}
              className="post-card__avatar"
            />
          </Link>

          <div className="post-card__user-details">
            <p className="post-card__username">{post.creator.name}</p>
            <div className="post-card__meta">
              <p className="post-card__date">
                {dayjs(post.$createdAt).fromNow()}
              </p>
              <p className="post-card__location">{post.location}</p>
            </div>
          </div>
        </div>

        {/* 수정버튼 (사용자 일경우 활성화) */}
        <Link
          to={`/edit/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img 
          width={24}
          height={24}
          src="/assets/edit.svg" />
        </Link>
      </div>

      {/* 본문 이미지, 클릭시 PostDetail로 */}
      <Link to={`/posts/${post.$id}`}>
        <div className="post-card__content">
          <p>{post.caption}</p>
          <ul className="post-card__tags">
            {post.tags.map((tag:string, index:string) => {
              return <li key={index}>#{tag}</li>;
            })}
          </ul>
        </div>
        {/* 게시물 이미지 */}
        <img
          src={post.imegeUrl || "assets.profile.svg"}
          className="post-card__img"
        />
      </Link>
      {/* <PostStats post={post} useId={user.id} /> */}
    </div>
  );
};

export default PostCard;
