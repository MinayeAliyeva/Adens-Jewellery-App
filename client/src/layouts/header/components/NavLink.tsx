import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface INavLink {
  path: string;
  label: string;
}
interface INavLinkProps {
  link: INavLink;
}
const NavLink: FC<INavLinkProps> = ({ link }) => {
  const { t } = useTranslation();
  return (
    <Link key={link.path} to={link.path} className="text-black text-lg">
      {t(link.label)}
    </Link>
  );
};

export default NavLink;
