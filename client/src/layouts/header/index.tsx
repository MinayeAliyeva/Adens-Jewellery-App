import { memo } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { isEmpty } from "lodash";
import { HeartOutlined } from "@ant-design/icons";

import { HeaderMenu, Logo, ProfileMenuComponent } from "./components";
import { iconStyle } from "./constants";
import TranslateComponent from "../../components/TranslateComponent";
import ShoppingCart from "./basket-panel/ShoppingCard";
import { getUserFromToken } from "../../shared/helpers/authStorage";
import { loadFromLocalStorage } from "../../shared/helpers/localStorageUtil";
import { useSelector } from "react-redux";
import { getUserDataSelector } from "../../redux/store";

const isLogin = !isEmpty(getUserFromToken());

const { Header: AntdHeader } = Layout;


const Header = () => {
  const userData = useSelector(getUserDataSelector);
  console.log("HEADER RERENDER", loadFromLocalStorage("token"), getUserFromToken(), userData);
  
  const token =loadFromLocalStorage("token");

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

        <Menu
          mode="horizontal"
          style={{
            display: "flex",
            gap: "20px",
            border: "none",
            alignItems: "center",
          }}
        >
          {token ? (
            <ProfileMenuComponent />
          ) : (
            <>
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Register</Link>
              <Link to="/favorite">
                <HeartOutlined style={iconStyle} />
              </Link>
            </>
          )}

          <ShoppingCart />
          <TranslateComponent />
        </Menu>
      </AntdHeader>

  );
};

export default Header;
