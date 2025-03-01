import { Outlet } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
import { Navigate} from "react-router-dom";

const PublicLayout = () => {
  const { user } = useUserContext();

  // 인증이 된 회원이면 홈으로 리디렉션 
  if (user.id) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="auth-main">
      <div className="auth-container">
        <Outlet />
      </div>
    </main>
  );
};

export default PublicLayout;
