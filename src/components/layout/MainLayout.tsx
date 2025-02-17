import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="main">
      <div className="auth-container">
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
