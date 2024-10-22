import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HeaderMenu, Logo, ProfileMenuComponent } from "./components";
import TranslateComponent from "../../components/TranslateComponent";
import ShoppingCart from "./basket-panel/ShoppingCard";
import FavoriteIcon from "./components/FavoriteIcon";
import { getUserFromToken } from "../../shared/helpers/authStorage";
import { useSelector } from "react-redux";
import { getUserDataSelector } from "../../redux/store";
import { isEmpty } from 'lodash';

const { Header: AntdHeader } = Layout;

const Header = () => {
  const userData=getUserFromToken();
  const authUser = useSelector(getUserDataSelector)
  const user =  isEmpty(authUser) ? userData : authUser;
  
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
          {user?._id ? (
            <ProfileMenuComponent />
          ) : (
            <>
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Register</Link>
            </>
          )}
          <FavoriteIcon/>

          <ShoppingCart />
          <TranslateComponent />
        </Menu>
      </AntdHeader>

  );
};

export default Header;
