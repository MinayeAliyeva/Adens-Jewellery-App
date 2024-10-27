import { Link } from "react-router-dom";
import { Layout } from "antd";
import { HeaderMenu, Logo, ProfileMenuComponent } from "./components";
import ShoppingCart from "./basket-panel/ShoppingCard";
import FavoriteIcon from "./components/FavoriteIcon";
import { getUserFromToken } from "../../shared/helpers/authStorage";
import { useSelector } from "react-redux";
import { getUserDataSelector } from "../../redux/store";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import TranslateComponent from "../../shared/components/TranslateComponent";

const { Header: AntdHeader } = Layout;

const Header = () => {
  const userData = getUserFromToken();
  const authUser = useSelector(getUserDataSelector);
  const user = isEmpty(authUser) ? userData : authUser;
  const { t } = useTranslation();
  return (
    <AntdHeader
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: "0 20px",
        width: "100%",
        zIndex: 1000,
        transition: "box-shadow 0.3s ease",
      }}
    >
      <Logo />
      <HeaderMenu />

      <div
        style={{
          display: "flex",
          gap: "20px",
          border: "none",
          alignItems: "center",
        }}
      >
        {user?._id ? (
          <ProfileMenuComponent />
        ) : (
          <>
            <Link to={"/login"}>{t("Login")}</Link>
            <Link to={"/register"}>{t("Register")}</Link>
          </>
        )}
        <FavoriteIcon />
        <ShoppingCart />
        <TranslateComponent />
      </div>
    </AntdHeader>
  );
};

export default Header;
