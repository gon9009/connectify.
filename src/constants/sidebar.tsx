import { SidebarNavLink } from "../types/types";

export const sidebarLinks: SidebarNavLink[] = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "홈",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/explore",
    label: "검색",
  },
  {
    imgURL: "/assets/people.svg",
    route: "/all",
    label: "사용자들",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/create-post",
    label: "만들기",
  },
];

export const mobileMenuLinks: SidebarNavLink[] = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/people.svg",
    route: "/all",
    label: "All",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/create-post",
    label: "Create",
  },
];
