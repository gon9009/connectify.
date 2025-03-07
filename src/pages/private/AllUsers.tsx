import Loader from "../../components/ui/Loader";
import UserCard from "../../components/features/user/UserCard";
import { useGetUsers } from "../../lib/react-query/queries";

const AllUsers = () => {
  const { data: creators, isLoading, isError } = useGetUsers(); // 전체 사용자 목록 요청

  if (isError) return <p>사용자를 불러오는데 실패했습니다</p>;
  if (isLoading) return <Loader />;

  return (
    <div className="all-users">
      <div className="all-users__container">
        <h2 className="all-users__title">사용자</h2>
        <ul className="all-users__lists">
          {creators?.documents.map((creator) => (
            <li key={creator.$id} className="all-users__list">
              <UserCard user={creator} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllUsers;

