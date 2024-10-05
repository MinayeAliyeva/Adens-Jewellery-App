import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLinkProps } from "react-router-dom";

interface INavLinkProps extends NavLinkProps{
  label: string;
}
const NavLink: FC<INavLinkProps> = ({ to, label }) => {
  const { t } = useTranslation();
  return (
    <Link to={to} className="text-black text-lg">
      {t(label)}
    </Link>
  );
};

export default NavLink;
