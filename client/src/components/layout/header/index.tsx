import { Layout, Menu } from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { menuItems, navLinks } from "../../../constants";
import { ProfileMenuComponent } from "./components/DropdownComponent";

const logo = "/assets/images/logo.png";

const { Header: AntdHeader } = Layout;

export default function Header() {
  return (
    <AntdHeader
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: "0 20px",
      }}
    >
      <Link to="/home">
     
        <img src={logo} className="w-24" alt="logo" />
      </Link>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path} className="text-black text-lg">
            {link.label}
          </Link>
        ))}
      </div>

      <Menu
        mode="horizontal"
        style={{ display: "flex", gap: "20px", border: "none" }}
      >
        <SearchOutlined style={{ color: "#707070" }} className="text-xl" />
        <ProfileMenuComponent items={menuItems} />
        <HeartOutlined style={{ color: "#707070" }} className="text-xl" />
        <ShoppingCartOutlined style={{ color: "#707070" }} className="text-xl" />
      </Menu>
    </AntdHeader>
  );
}
