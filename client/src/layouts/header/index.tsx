import { Layout, Menu } from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { menuItems, navLinks } from "../../constants";
import { ProfileMenuComponent } from "./components/DropdownComponent";
import SelecBox from "./components/SelecBox";
import React from "react";
import NavLink from "./components/NavLink";

const logo = "/assets/images/logo.png";
const { Header: AntdHeader } = Layout;

const Header = React.memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <Link to="/home">
        <img src={logo} className="w-24" alt="logo" />
      </Link>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {navLinks.map((link,i) => (
          <NavLink key={i}  link={link} />
        ))}
      </div>

      <Menu
        mode="horizontal"
        style={{
          display: "flex",
          gap: "20px",
          border: "none",
          alignItems: "center",
        }}
      >
        <SearchOutlined style={{ color: "#707070" }} className="text-xl" />
        <ProfileMenuComponent items={menuItems} />
        <Link to="/favorite">
          <HeartOutlined style={{ color: "#707070" }} className="text-xl" />
        </Link>
        <ShoppingCartOutlined
          style={{ color: "#707070" }}
          className="text-xl"
        />
        <SelecBox />
      </Menu>
    </AntdHeader>
  );
});

export default Header;
