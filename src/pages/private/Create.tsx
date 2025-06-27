import { useCreatePost } from "../../lib/react-query/queries";
import { useNavigate } from "react-router-dom";
import { PostForm } from "../../components/features/posts/PostForm";
import { useUserContext } from "../../context/AuthContext";
import { PostFormData } from "../../lib/validation/auth";

// 새로운 게시물 생성하는 페이지
const Create = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  // 쿼리
  const { mutateAsync: createPost, isPending: isPendingCreate } =
  useCreatePost();

  // 새 게시물
  const handleCreate = async (value: PostFormData) => {
    await createPost({ ...value, userId: user.id });
    return navigate("/");
  };

  return (
    <div className="post-form-page">
      <div className="post-form-page__container">
        <div className="post-form-page__header">
          <img
            src="/assets/create.svg"
            width={36}
            height={36}
            alt="새로운 게시물 생성"
          />
          <h2 className="post-form-page__title">새 게시글 생성</h2>
        </div>
        <PostForm
          isPending={isPendingCreate}
          action="Create"
          onCreate={handleCreate}
        />
      </div>
    </div>
  );
};

export default Create;
