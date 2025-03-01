import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useUserContext } from "../../../context/AuthContext";
import { Post } from "../../../types/types";
import PostStats from "./PostStats";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type PostUserProps = Pick<Post, "creator" | "$createdAt" | "location">;
type PostEditButtonProps = Pick<Post, "$id"> & { isEditable: boolean };
type PostImageProps = Pick<Post, "$id" | "imageUrl" | "caption" | "tags">;

// ✅ 사용자 정보 (프로필 이미지, 이름, 날짜, 위치)
// createdAt 은 Models.Docuemnt 에 잇을텐데 ?
const PostUser = ({ creator, $createdAt, location }: PostUserProps) => {
  return (
    <div className="post-card__user">
      <Link to={creator.$id} className="post-card__user-link">
        <img
        width={48}
        height={48}
          src={creator.imageUrl || "/assets/placeholder.svg"}
          className="post-card__avatar"
        />
      </Link>
      <div className="post-card__user-details">
        <p className="post-card__username">{creator.name}</p>
        <div className="post-card__meta">
          <p className="post-card__date">{dayjs($createdAt).fromNow()}</p>
          <p className="post-card__location">{location}</p>
        </div>
      </div>
    </div>
  );
};

// ✅ 게시물 수정 버튼 (작성자만 표시)
const PostEditButton = ({ $id, isEditable }: PostEditButtonProps) => {
  return isEditable ? (
    <Link to={`/edit/${$id}`} className="post-card__edit-button">
      <img src="/assets/edit.svg" alt="Edit Post" />
    </Link>
  ) : null;
};

// ✅ 게시물 본문 및 이미지
const PostImage = ({ $id, imageUrl, caption, tags }: PostImageProps) => {
  return (
    <Link to={`/posts/${$id}`}>
      <div className="post-card__content">
        <p>{caption}</p>
        <ul className="post-card__tags">
          {tags.map((tag, index) => (
            <li key={index}>#{tag}</li>
          ))}
        </ul>
      </div>
      <img
        src={imageUrl || "/assets/placeholder.svg"}
        className="post-card__img"
        alt="Post Image"
      />
    </Link>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  const { user } = useUserContext(); // 현재 로그인한 사용자 정보 가져오기
  const isEditable = user.id === post.creator.$id; // 게시물 수정 가능 여부

  
  return (
    <div className="post-card">
      <div className="post-card__header">
        <PostUser
          creator={post.creator} // ✅ 이제 creator 전체를 전달해야 함!
          $createdAt={post.$createdAt}
          location={post.location}
        />
        {isEditable && (
          <PostEditButton $id={post.$id} isEditable={isEditable} />
        )}
      </div>
      {/* 📌 게시물 본문 (이미지, 캡션, 태그) */}
      <PostImage
        $id={post.$id}
        imageUrl={post.imageUrl}
        caption={post.caption}
        tags={post.tags}
      />
      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
