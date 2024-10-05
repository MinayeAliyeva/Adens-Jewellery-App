import { useNavigate } from "react-router-dom";
import { Dropdown, Menu, MenuProps } from "antd";

import { UserOutlined } from "@ant-design/icons";

import { menuItems } from "../constants";

export const ProfileMenuComponent = () => {
  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "register") {
      navigate("/register");
    } else if (e.key === "login") {
      navigate("/login");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <UserOutlined className="text-xl" style={{ color: "#707070" }} />
    </Dropdown>
  );
};
