const ExploreHeader = () => {
  return (
    <div className="explore__header">
      <h2 className="explore__title">검색</h2>
      <img
        src="/assets/search.svg"
        width={24}
        height={24}
        alt="검색"
        className="invert-white"
      />
      <input
        value={}
        onChange={}
        className="explore__search-input"
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
};

export default ExploreHeader;
