import { useNavigate, useParams } from "react-router-dom";
import GridPostList from "../../components/features/posts/PostList";
import Loader from "../../components/ui/Loader";
import {
  useGetPostById,
  useGetUserPosts,
  useDeletePost,
} from "../../lib/react-query/queries";
import { Post } from "../../types/types";
import PostCard from "../../components/features/posts/postcard/PostCard";
import { Divider } from "../../components/features/posts/Divider";
export type RelatedPostsProps = {
  relatedPosts?: Post[]; // undefined만 처리 (null은 제외)
  isUserPostLoading: boolean;
};

// 관련 게시글
const RelatedPosts = ({
  relatedPosts = [],
  isUserPostLoading,
}: RelatedPostsProps) => {
  if (isUserPostLoading) {
    return <Loader />;
  }

  // undefined -> loading : true
  return (
    <div className="post-details__related">
      <Divider postType="list" />
      <h3 className="post-details__related-title">연관 게시물</h3>
      {relatedPosts.length === 0 && (
        <p className="post-details__empty">연관 게시물이 없습니다!</p>
      )}
      <GridPostList posts={relatedPosts} />
    </div>
  );
};

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
        <PostCard
          variant="detail"
          post={post}
          isDetail={true}
          handleDelete={handleDeletePost}
        />
        <RelatedPosts
          relatedPosts={relatedPosts}
          isUserPostLoading={isUserPostLoading}
        />
      </div>
    </div>
  );
};

export default PostDetails;
