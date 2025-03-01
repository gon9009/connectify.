import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useUserContext } from "../../context/AuthContext";
import { useSignOutAccount } from "../../lib/react-query/queries";
import { INITIAL_USER } from "../../constants/authState";

// 모바일 헤더 로고 ,
const MobileHeaderLogo = () => {
  return (
    <Link to="/">
      <img
        width={130}
        height={325}
        src="/assets/logo.png"
        alt="logo"
        className="mobile-header__logo"
      />
    </Link>
  );
};

// 모바일 로그아웃 버튼
const MobileLogoutButton = ({
  handleSignout,
}: {
  handleSignout: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <Button className="mobile-header__logout" onClick={handleSignout}>
      <img width={10} height={15} src="/assets/logout.svg" alt="로그아웃" />
    </Button>
  );
};

// 모바일 유저 프로필
const MobileUserProfile = ({ user }: { user: typeof INITIAL_USER }) => {
  return (
    <Link to={`/profile/${user.id}`} className="mobile-header__profile">
      <img
        width={32}
        height={32}
        src={user.imageUrl || "/assets/placeholder.svg"}
        alt="프로필"
        className="mobile-header__profile-img"
      />
    </Link>
  );
};

// 모바일 헤더
const MobileHeader = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const { mutate: signOut } = useSignOutAccount();

  const handleSignout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <section className="mobile-header">
      <div className="mobile-header__wrapper">
        <MobileHeaderLogo />
        <div className="mobile-header__actions">
          {/* <MobileLogoutButton handleSignout={handleSignout} /> */}
          <MobileUserProfile user={user} />
        </div>
      </div>
    </section>
  );
};

export default MobileHeader;
