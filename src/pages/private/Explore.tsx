import ExploreHeader from "../../components/features/explore/ExploreHeader";
import SearchResult from "../../components/features/explore/SearchResult";

const Explore = () => {
  // URL searchParam 로 관리할것
  return (
    <div className="explore">
      <div className="expore__container">
        <ExploreHeader />
        <SearchResult />
      </div>
    </div>
  );
};

export default Explore;
