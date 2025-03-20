import { useSearchInfinitePosts } from "../../../lib/react-query/queries";
import { useInView } from "react-intersection-observer";
import Loader from "../../ui/Loader";
import GridPostList from "../posts/PostList";
import { useEffect } from "react";

type DebouncedSearchProps = {
  debouncedSearch: string;
};

const SearchResult = ({ debouncedSearch }: DebouncedSearchProps) => {
  const { ref, inView } = useInView();
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchInfinitePosts(debouncedSearch);

  // 무한 스크롤 트리거
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 1. 로딩 상태
  if (isLoading) {
    return <Loader />;
  }

  // 2. 검색어 입력 전 초기 상태
  if (!debouncedSearch) {
    return (
      <>
        <p className="explore__search-result--empty">
          관심있는 게시물을 검색해보세요
        </p>
        <p className="explore__serach-result--empty-test">
          "테스트" 라고 검색해보세요
        </p>
      </>
    );
  }

  // 데이터 평탄화
  const posts = data?.pages.flatMap((page) => page.documents) ?? [];

  console.log(posts);

  // 검색 결과가 없을떄
  if (posts.length === 0) {
    return (
      <p className="explore__search-results--noresult">검색 결과가 없습니다.</p>
    );
  }

  //
  return (
    <>
      <div className="explore__search-results">
        {/* PostList 에 전달하는것은 데이터 묶음들들 */}
        <GridPostList posts={posts} />

        {/* 다음 페이지 데이터가 있어야지 ref 영역 활성화 */}
        {debouncedSearch && hasNextPage && (
          <div ref={ref}>{isFetchingNextPage && <Loader />}</div>
        )}
      </div>
    </>
  );
};

export default SearchResult;
