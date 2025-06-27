interface ExploreHeaderProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}
const ExploreHeader = ({ searchValue, setSearchValue }: ExploreHeaderProps) => {
  return (
    <div className="explore__header">
      <h2 className="explore__title">검색</h2>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="input explore__search-input"
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
};

export default ExploreHeader;
