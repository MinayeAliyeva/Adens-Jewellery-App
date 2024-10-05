import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import { HeaderMenu, LanguageComponent, Logo, ProfileMenuComponent } from "./components";

const { Header: AntdHeader } = Layout;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
   console.log("rerender header");

  return (
    <AntdHeader
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: "0 20px",
        position: isScrolled ? 'fixed' : 'static',
        top: isScrolled ? 0 : 'auto',
        width: '100%',
        zIndex: 1000,
        boxShadow: isScrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <Logo/>


      <HeaderMenu/>

      <Menu
        mode="horizontal"
        style={{
          display: "flex",
          gap: "20px",
          border: "none",
          alignItems: "center",
        }}
      >
        <SearchOutlined style={iconStyle} />

        <ProfileMenuComponent />

        <Link to="/favorite">
          <HeartOutlined style={iconStyle} />
        </Link>

        <ShoppingCartOutlined style={iconStyle} />

        <LanguageComponent />

      </Menu>
    </AntdHeader>
  );
};

export default Header;
