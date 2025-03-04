import { useForm, setValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUploader } from "../posts/FileUploader";
import { PostFormData, PostValidation } from "../../../lib/validation/auth";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { useNavigate } from "react-router-dom";
import { Models } from "appwrite";

type PostFormProps = {
  post?: Models.Document; // 실제 Post 타입 읽어오기
  action: "Create" | "Update"; // 액션 타입 (생성 또는 수정)
  onCreate?: (values: PostFormData) => Promise<void>;
  onUpdate?: (values: PostFormData) => Promise<void>;
  isPending: boolean;
};

// Model-> 타입 추출용
const PostForm = ({
  post,
  action,
  onCreate,
  onUpdate,
  isPending,
}: PostFormProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // 제출 핸들러
  const onSubmit = async (values: PostFormData) => {
    // { caption: "...", file: [...], location: "...", tags: "..." }
    if (action === "Update" && onUpdate) {
      await onUpdate(values);
    } else if (action === "Create" && onCreate) {
      await onCreate(values);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="post-form">
        {/* 게시글 추가 */}
        <div className="post-form__container">
          <Label htmlFor="caption" className="post-form__label">
            어떤 이야기를 나누고 싶나요?
          </Label>
          <Textarea
            id="caption"
            placeholder="게시글 내용을 입력하세요"
            className={`post-form__textarea ${errors.caption ? "error" : ""}`}
            {...register("caption")}
          />
          {errors.caption && (
            <p className="error-message">{errors.caption.message}</p>
          )}
        </div>
        {/* 사진 추가하기 */}
        <div className="post-form__container">
          <Label htmlFor="file" className="post-form__label">
            사진을 추가하세요
          </Label>
          <FileUploader
            fieldChange={(files) => setValue("file", files)} // setValue 사용
            mediaUrl={post?.imageUrl} // 수정 모드에서 기존 이미지 URL 전달
          />
          {errors.file && (
            <p className="error-message">{errors.file.message}</p>
          )}
        </div>
        {/*위치 추가하기 */}
        <div className="post-form__container">
          <Label htmlFor="location" className="post-form__label">
            어디서 찍은 사진인가요 ?
          </Label>
          <Input
            id="location"
            type="text"
            placeholder="위치를 입력하세요"
            className={`post-form__input ${errors.location ? "error" : ""}`}
            {...register("location")}
          />
          {errors.location && (
            <p className="error-message">{errors.location.message}</p>
          )}
        </div>
        {/* 태그 추가하기 */}
        <div className="post-form__container">
          <Label htmlFor="tags" className="post-form__label">
            쉼표( , )로 구분하여 태그를 입력하세요
          </Label>
          <Input
            id="tags"
            type="text"
            placeholder="여행,일상,공부"
            className={`post-form__input ${errors.tags ? "error" : ""}`}
            {...register("tags")}
          />
          {errors.tags && (
            <p className="error-message">{errors.tags.message}</p>
          )}
        </div>
        {/* 버튼 */}
        <div className="post-form__btn-container">
          <Button
            onClick={() => navigate(-1)}
            className="btn auth-form__btn-cancel"
          >
            취소
          </Button>
          <Button
            type="submit"
            className="btn post-form__btn-post"
            disabled={isPending}
          >
            {isPending ? "제출 중..." : "제출"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PostForm;
