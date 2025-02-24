import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import { SidebarNavLink } from "../../types/types";
import { sidebarLinks } from "../../constants/sidebar";
import Loader from "../ui/Loader";
import { useUserContext } from "../../context/AuthContext";
import { INITIAL_USER } from "../../constants/authState";
import logo from "../../assets/images/logo.svg";
import Button from "../ui/Button";
import logout from "../../assets/logout.svg";
import placeholder from "../../assets/placeholder.svg";
import { useSignOutAccount } from "../../lib/react-query/queries";

// 사이드바 로고 컴포넌트
const SidebarLogo = () => (
  <Link to="/" className="sidebar__logo">
    <img src={logo} alt="logo" />
  </Link>
);

// 사이드바 사용자 프로필 컴포넌트
const SidebarUserProfile = ({
  user,
  isLoading,
}: {
  user: typeof INITIAL_USER;
  isLoading: boolean;
}) => {
  if (isLoading || !user.id) {
    return <Loader />;
  }

  return (
    <Link to={`/profile/${user.id}`} className="sidebar__profile">
      <img
        src={user.imageUrl || placeholder}
        alt="프로필"
        className="sidebar__profile-img"
      />
      <div className="sidebar__profile-info">
        <p className="sidebar__profile-name">{user.name}</p>
        <p className="sidebar__profile-username">@{user.username}</p>
      </div>
    </Link>
  );
};

// 사이드바 네비게이션 링크 아이템 컴포넌트
const SidebarNavItem = ({
  link,
  pathname,
}: {
  link: SidebarNavLink;
  pathname: string;
}) => {
  const isActive = pathname === link.route;
  return (
    <li key={link.label} className="sidebar__menu-item">
      <NavLink to={link.route} className="sidebar__menu-item-link">
        <img
          src={link.imgURL}
          alt={link.label}
          className={`sidebar__menu-item-icon ${isActive ? "active" : ""}`}
        />
        {link.label}
      </NavLink>
    </li>
  );
};

// 사이드바 로그아웃 버튼 컴포넌트
const SidebarLogoutButton = ({
  handleSignout,
}: {
  handleSignout: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <Button className="sidebar__logout-btn" onClick={handleSignout}>
      <img src={logout} alt="로그아웃" />
      <p className="sidebar__logout-btn-description">Logout</p>
    </Button>
  );
};

// 사이드바
const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mutate: signOut } = useSignOutAccount();
  const { user, setUser, isLoading } = useUserContext();

  const handleSignout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__wrapper">
        <SidebarLogo />
        <SidebarUserProfile user={user} isLoading={isLoading} />
        <ul className="sidebar__menu">
          {sidebarLinks.map((link) => (
            <SidebarNavItem key={link.label} link={link} pathname={pathname} />
          ))}
        </ul>
      </div>
      <SidebarLogoutButton handleSignout={handleSignout} />
    </aside>
  );
};

export default Sidebar;
