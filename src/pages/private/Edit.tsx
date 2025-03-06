import { useNavigate } from "react-router-dom";
import { useUpdatePost } from "../../lib/react-query/queries";
import PostForm from "../../components/features/posts/PostForm";
import { PostFormData } from "../../lib/validation/auth";
import { useParams } from "react-router-dom";
import { useGetPostById } from "../../lib/react-query/queries";
import Loader from "../../components/ui/Loader";

// 기존 게시물을 수정하는 페이지
const Edit = () => {
  const { id } = useParams();
  const { data: post, isLoading: isPostLoading } = useGetPostById(id);
  const navigate = useNavigate();

  // 쿼리
  const { mutateAsync: updatePost, isPending: isUpdatePending } =
    useUpdatePost();

  if (isPostLoading) {
    return <Loader />;
  }

  if (!post) {
    return <p>파일이 존재하지 않습니다</p>;
  }
  // 게시물 수정 핸들러
  // useGetPostById(id) 는 비동기 쿼리 이므로 , 데이터가 로드되기 전 post값이 undefined 가 될수 있다
  const handleUpdate = async (value: PostFormData) => {
    await updatePost({
      ...value,
      postId: post.$id,
      imageId: post.imageId,
      imageUrl: post.imageUrl,
    });

    return navigate(`/posts/${post.$id}`);
  };

  return (
    <div className="post-form-page">
      <div className="post-form-page__container">
        <div className="post-form-page__header">
          <img
            src="/assets/edit.svg"
            width={36}
            height={36}
            alt="게시물 수정"
          />
          <h2 className="post-form-page__title">게시물 수정</h2>
        </div>
        <PostForm
          isPending={isUpdatePending}
          action="Update"
          post={post}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default Edit;
