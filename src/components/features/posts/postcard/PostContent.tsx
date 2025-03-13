import { Link } from "react-router-dom";

export type PostContentProp = {
  postId: string;
  caption: string;
  tags: string[];
};

export const PostContent = ({ postId, caption, tags }: PostContentProp) => {
  return (
    <Link to={`/posts/${postId}`}>
      <div className="post-card__content">
        <p>{caption}</p>
        <ul className="post-card__tags">
          {tags.map((tag, index) => (
            <li key={index}>#{tag}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
};
