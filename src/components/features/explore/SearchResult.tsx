import { useSearchInfinitePosts } from "../../../lib/react-query/queries";
import { useInView } from "react-intersection-observer";
import Loader from "../../ui/Loader";
import GridPostList from "../posts/PostList";
import { useEffect } from "react";
import EmptyState from "../posts/EmptyState";

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

  // 로딩 상태
  if (isLoading) {
    return <Loader />;
  }

  // 검색어 입력 전 초기 상태
  if (!debouncedSearch) {
    return <EmptyState message="테스트 라고 검색해보세요❗" />;
  }

  // 데이터 평탄화
  const posts = data?.pages.flatMap((page) => page.documents) ?? [];

  // 검색 결과가 없을떄
  if (posts.length === 0) {
    return <EmptyState message="검색 결과가 없습니다" />;
  }

  //
  return (
    <>
      <div className="explore__search-results">
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
