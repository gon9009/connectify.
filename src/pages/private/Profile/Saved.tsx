import GridPostList from "../../../components/features/posts/PostList";
import Loader from "../../../components/ui/Loader";
import { useOutletContext } from "react-router-dom";

const Saved = () => {
  // creator 를 반환하는 쿼리 찾기
  const { save, isProfileOwner, isLoading } = useOutletContext();

  if (!isProfileOwner) {
    return <p>접근 권한이 없습니다</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (save.length === 0) {
    return <p>저장된 게시물이 없습니다</p>;
  }
  return (
    <GridPostList
      posts={save?.map((saveItem) => saveItem.post)}
      showUser={false}
      showStats={false}
    />
  );
};

export default Saved;
