import { Link } from "react-router-dom";
import { Button } from "@/components/ui";

type PostActionsProps = {
  postId: string;
  isPostOwner: boolean;
  isDetail?: boolean;
  handleDeletePost?: () => void;
};
const PostActions = ({
  postId,
  isPostOwner,
  isDetail,
  handleDeletePost,
}: PostActionsProps) => {
  if (!isPostOwner) return null;

  return (
    <div className="post-card__actions">
      <Link to={`/edit/${postId}`} className="post-card__edit-btn">
        <img width={24} height={24} src="/assets/edit.svg" alt="Edit Post" />
      </Link>
      
      {isDetail && handleDeletePost && (
        <Button onClick={handleDeletePost} className="post-card__delete-btn">
          <img src="/assets/delete.svg" alt="delete" width={24} height={24} />
        </Button>
      )}
    </div>
  );
};

export default PostActions;
