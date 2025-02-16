import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <main className="main">
      <div className="auth-container">
        <Outlet />
      </div>
    </main>
  );
};

export default PublicLayout;
