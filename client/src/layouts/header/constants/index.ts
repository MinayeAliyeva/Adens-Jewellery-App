// import { useTranslation } from "react-i18next";
// const { t } = useTranslation();
export interface InavLinksData {
  path: string;
  label: string;
}

export const menuItems = [
  { key: "profil", label: "Profil" },
  { key: "logout", label: "Logout" },
];

export const navLinksData: InavLinksData[] = [
  { path: "/home", label:"Home" },
  { path: "/shop", label: "Shop" },
  { path: "/products", label: "Products" },
  { path: "/about", label: "About Us" },
  { path: "/contact", label: "Contact Us" },
  { path: "/fag", label: "FAG" },
];

export  const iconStyle = { color: "#707070", fontSize: "20px" };
