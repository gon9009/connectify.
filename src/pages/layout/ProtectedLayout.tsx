import { useUserContext } from "../../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../../components/ui/Loader";
import Sidebar from "../../components/layout/Sidebar";
import MobileHeader from "../../components/layout/MobileHeader";
import MobileMenu from "../../components/layout/MobileMenu";

const ProtectedLayout = () => {
  const { user, isLoading } = useUserContext();

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
    <div className="main">
      <MobileHeader />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <MobileMenu />
    </div>
  );
};

export default ProtectedLayout;
