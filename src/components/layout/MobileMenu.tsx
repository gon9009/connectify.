import { Link, useLocation } from "react-router-dom";
import { SidebarNavLink } from "../../types/types";
import { mobileMenuLinks } from "../../constants/sidebar";

// 모바일 메뉴 아이템
const MobileMenuItem = ({
  link,
  isActive,
}: {
  link: SidebarNavLink;
  isActive: boolean;
}) => {
  return (
    <li className="mobile-menu__item">
      <Link
        key={`mobile-menu-${link.label}`}
        to={link.route}
        className={`mobile-menu__link ${isActive ? "active" : ""}`}
      >
        <img
          src={link.imgURL}
          alt={link.label}
          width={34}
          height={34}
          className="mobile-menu__icon"
        />
      </Link>
    </li>
  );
};

// 모바일 메뉴
const MobileMenu = () => {
  const { pathname } = useLocation();

  return (
    <nav className="mobile-menu">
      <ul className="mobile-menu__list">
        {mobileMenuLinks.map((link) => (
          <MobileMenuItem
            key={link.label}
            link={link}
            isActive={pathname === link.route}
          />
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;
