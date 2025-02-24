import { SidebarNavLink } from "../types/types";

export const sidebarLinks:SidebarNavLink[]= [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/wallpaper.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/people.svg",
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: "/assets/saved.svg",
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: "/assets/create",
    route: "/create-post",
    label: "Create Post",
  },
];

export const mobileMenuLinks:SidebarNavLink[]=[
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/wallpaper.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/saved.svg",
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/create-post",
    label: "Create",
  },
];
