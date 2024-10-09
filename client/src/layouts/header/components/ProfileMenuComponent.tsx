import { useNavigate } from "react-router-dom";
import { Dropdown, Menu, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { menuItems } from "../constants";

export const ProfileMenuComponent = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken"); 

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "register") {
      navigate("/register");
    } else if (e.key === "profil") {
      navigate("/profile");
    } else if (e.key === "login") {
      navigate("/login");
    } else if (e.key === "logout") {
      handleLogout(); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/login"); 
  };

  const filteredMenuItems = menuItems.filter((item) => {
    if (!authToken) {
      return true;
    }
    return item.key !== "login" && item.key !== "register";
  });

  const logoutMenuItem = { key: "logout", label: "Log Out" };
  const completeMenuItems = authToken
    ? [...filteredMenuItems, logoutMenuItem] 
    : filteredMenuItems;

  const menu = (
    <Menu onClick={handleMenuClick}>
      {completeMenuItems.map((item) => (
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
