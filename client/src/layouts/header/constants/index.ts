export interface InavLinksData{
  path: string;
  label: string;
}

export const menuItems = [
  { key: "profil", label: "Profil" },
  { key: "settings", label: "Settings" },
  { key: "exit", label: "Exit" },
  { key: "login", label: "Login" },
  { key: "register", label: "Register" },
];
export const navLinksData: InavLinksData[] = [
    { path: "/home", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
    { path: "/fag", label: "FAG" },
  ];
  