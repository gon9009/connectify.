import { useGetCurrentUser } from "../../lib/react-query/queries";
import GridPostList from "../../components/features/posts/PostList";
import Loader from "../../components/ui/Loader";

const Saved = () => {
  // creator 를 반환하는 쿼리 찾기
  const { data: currentUser, isLoading } = useGetCurrentUser();

  if (isLoading) {
    return <Loader />;
  }
  if (!currentUser) {
    <p>사용자 정보를 찾을수 없습니다</p>;
  }

  if (currentUser?.save.length === 0) {
    return <p>저장된 게시물이 없습니다</p>;
  }
  return (
    <div className="saved">
      <div className="saved__header">
        <img
          src="/assets/save.svg"
          width={36}
          height={36}
          alt="Saved posts"
          className="saved__icon"
        />
        <h2 className="saved__title">저장된 게시물</h2>
      </div>

      <ul className="saved__list">
        <GridPostList
          posts={currentUser?.save.map((saveItem) => saveItem.post)}
          showUser={false}
          showStats={false}
        />
      </ul>
    </div>
  );
};

export default Saved;
