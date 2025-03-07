import { Link, useNavigate, useParams } from "react-router-dom";
import GridPostList from "../../components/features/posts/PostList";
import Loader from "../../components/ui/Loader";
import { useUserContext } from "../../context/AuthContext";
import PostStats from "../../components/features/posts/PostStats";
import {
  useGetPostById,
  useGetUserPosts,
  useDeletePost,
} from "../../lib/react-query/queries";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Button from "../../components/ui/Button";
import { Post } from "../../types/types";

dayjs.locale("ko");
dayjs.extend(relativeTime);

// 최종 타입 정의
export type PostActionsProps = {
  post: Pick<Post, "$id">; // imageId 추가 (삭제 시 필요)
  handleDeletePost: () => void;
};

export type PostHeaderProps = {
  post: Pick<Post, "$id" | "$createdAt" | "creator" | "location">;
  user: { id: string };
  handleDeletePost: () => void;
};

export type PostContentProps = {
  post: Pick<Post, "caption" | "tags">;
};

export type RelatedPostsProps = {
  relatedPosts?: Post[]; // undefined만 처리 (null은 제외)
  isUserPostLoading: boolean;
};

// 수정 삭제
const PostActions = ({ post, handleDeletePost }: PostActionsProps) => {
  return (
    <div className="post-details__actions">
      <Link
        to={`/update-post/${post?.$id}`}
        className={`post-details__edit-btn`}
      >
        <img src={"/assets/edit.svg"} alt="edit" width={24} height={24} />
      </Link>
      <Button onClick={handleDeletePost} className={`post-details__delete-btn`}>
        <img src={"/assets/delete.svg"} alt="delete" width={24} height={24} />
      </Button>
    </div>
  );
};

// 포스트 헤더
const PostHeader = ({ post, user, handleDeletePost }: PostHeaderProps) => {
  // 현재 게시물 작성자인지 묻는 함수
  const isPostOwner = user.id === post.creator.$id;

  return (
    <div className="post-details__top">
      <Link
        to={`/profile/${post?.creator.$id}`}
        className="post-details__creator"
      >
        <img
          src={post?.creator.imageUrl || "/assets/placeholder.svg"}
          alt="creator"
          className="post-details__creator-avatar"
          width={48}
          height={48}
        />
        <div className="post-details__creator-info">
          <p className="post-details__creator-name">{post?.creator.name}</p>
          <div className="post-details__meta">
            <p className="post-details__date">
              {dayjs(post.$createdAt).fromNow()}
            </p>
            <span>•</span>
            <p className="post-details__location">{post?.location}</p>
          </div>
        </div>
      </Link>

      {isPostOwner && (
        <PostActions post={post} handleDeletePost={handleDeletePost} />
      )}
    </div>
  );
};

// 포스트 컨텐츠
const PostContent = ({ post }: PostContentProps) => {
  return (
    <div className="post-details__content">
      <p>{post?.caption}</p>
      <ul className="post-details__tags">
        {post?.tags.map((tag: string, index: number) => (
          <li key={`${tag}${index}`} className="post-details__tag">
            #{tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

// 관련 게시글
const RelatedPosts = ({
  relatedPosts,
  isUserPostLoading,
}: RelatedPostsProps) => {
  if (isUserPostLoading) {
    return <Loader />;
  }

  if (!relatedPosts || relatedPosts.length === 0) {
    return <div>관련 게시글이 없습니다</div>;
  }

  return (
    <div className="post-details__related">
      <hr className="post-details__divider" />
      <h3 className="post-details__related-title">연관 게시물</h3>
      <GridPostList posts={relatedPosts} />;
    </div>
  );
};

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();
  // 단일 게시물
  const { data: post, isLoading } = useGetPostById(id);
  // 사용자의 게시물들
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );
  const { mutateAsync: deletePost } = useDeletePost();

  // 같은 작성자의 다른 게시물들 , 작성자의 현재 게시물 (id) 을 제외한 다른 게시물 (userPost.$id)
  const relatedPosts = userPosts?.filter((userPost) => userPost.$id !== id);

  if (isLoading) {
    return <Loader />;
  }
  if (!post) {
    return <p>에러 !</p>;
  }

  // 삭제 핸들러
  const handleDeletePost = async () => {
    try {
      await deletePost({ postId: id, imageId: post?.imageId });
      navigate(-1);
    } catch (error) {
      console.error("게시물 삭제 실패:", error);
    }
  };

  return (
    <div className="post-details">
      <div className="post-details__container">
        <div className="post-details__card">
          <img
            src={post?.imageUrl}
            alt="post"
            className="post-details__image"
          />
          <div className="post-details__info">
            <PostHeader
              post={post}
              user={user}
              handleDeletePost={handleDeletePost}
            />
            <hr className="post-details__divider" />
            <PostContent post={post} />
            <div className="post-details__stats">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
        <RelatedPosts
          relatedPosts={relatedPosts}
          isUserPostLoading={isUserPostLoading}
        />
      </div>
    </div>
  );
};

export default PostDetails;
