import { useUserContext } from "../../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../../components/ui/Loader";

const ProtectedLayout = () => {
  const { user, isLoading } = useUserContext(); // isAuthenticated 제거

  // 1. 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="main">
        <Loader />
      </div>
    );
  }

  // 2. user.id로 인증 상태 확인
  if (!user.id) {
    return <Navigate to="/sign-in" replace />;
  }

  // 3. 인증된 상태
  return (
    <main className="main">
      <Outlet />
    </main>
  );
};

export default ProtectedLayout;