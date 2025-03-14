import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { PostVariant } from "./PostCard";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export type PostInfoProp = {
  creatorName: string;
  createdAt: string;
  location?: string;
  variant?: PostVariant;
};

// PostInfo.tsx
// GridList 에서는 보이지 않는다 
export const PostInfo = ({
  creatorName,
  createdAt,
  location,
  variant = "",
}: PostInfoProp) => {
  return (
    <>
      <div className="post-card__details">
        <p className="post-card__username">{creatorName}</p>
        <div className="post-card__meta">
          <time className="post-card__meta-date">
            {dayjs(createdAt).fromNow()}
          </time>
          {location && (
            <>
              <span>•</span>
              <span className="post-card__meta-location">{location}</span>
            </>
          )}
        </div>
      </div>
    </>
  );
};
