import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Drawer } from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  SettingOutlined, // Import the settings icon
} from "@ant-design/icons";

import {
  HeaderMenu,
  LanguageComponent,
  Logo,
  ProfileMenuComponent,
} from "./components";
import DrawerComponent from "../../components/DrawerComponent";
import SettingsSidebar from "../SettingsSidebar";

const { Header: AntdHeader } = Layout;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false); // State for settings sidebar
  const [pageColor, setPageColor] = useState("white"); // State for page color

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const iconStyle = { color: "#707070", fontSize: "20px" };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onClose = () => {
    setIsDrawerVisible(false);
  };

  const showSettings = () => {
    setIsSettingsVisible(true);
  };

  const closeSettings = () => {
    setIsSettingsVisible(false);
  };

  const existsUser = localStorage.getItem("authToken");

  return (
    <>
      <AntdHeader
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: pageColor,
          padding: "0 20px",
          position: isScrolled ? "fixed" : "static",
          top: isScrolled ? 0 : "auto",
          width: "100%",
          zIndex: 1000,
          boxShadow: isScrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none",
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
          {existsUser && <ProfileMenuComponent />}
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
          <Link to="/favorite">
            <HeartOutlined style={iconStyle} />
          </Link>
          <ShoppingCartOutlined style={iconStyle} onClick={showDrawer} />
          <DrawerComponent
            onClose={onClose}
            isDrawerVisible={isDrawerVisible}
          />
          <SettingOutlined style={iconStyle} onClick={showSettings} />{" "}
          <SettingsSidebar
            onClose={closeSettings}
            isVisible={isSettingsVisible}
          />
    
        </Menu>
      </AntdHeader>
    </>
  );
};

export default memo(Header);
