import { useState, useEffect } from "react";
import ExploreHeader from "../../components/features/explore/ExploreHeader";
import SearchResult from "../../components/features/explore/SearchResult";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";

const Explore = () => {
  const [searchParams, setSearchParmas] = useSearchParams();
  const [searchValue, setSearchValue ] = useState(searchParams.get("q") || "");

  // 디바운싱 처리된 결과 값
  const debouncedSearch = useDebounce(searchValue, 500);
  
  useEffect(() => {
    if (debouncedSearch) {
      setSearchParmas({ q: debouncedSearch });
    } else {
      setSearchParmas({});
    }
  }, [debouncedSearch, setSearchParmas]);

  return (
    <div className="explore">
      <div className="explore__container">
        <ExploreHeader
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <SearchResult debouncedSearch={debouncedSearch}/>
      </div>
    </div>
  );
};

export default Explore;
