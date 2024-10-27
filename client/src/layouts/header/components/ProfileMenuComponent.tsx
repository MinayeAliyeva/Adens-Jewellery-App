import { Dropdown, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { menuItems } from "../constants";
import { setLogout } from "../../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProfileMenuComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      handleLogout();
    } else if (e.key === "profil") {
      navigate("/profile");
    }
  };

  const menuItemsWithActions = menuItems.map((item: any) => ({
    key: item.key,
    label: item.label,
    onClick: handleMenuClick,
  }));

  return (
    <Dropdown menu={{ items: menuItemsWithActions }} trigger={["click"]}>
      <UserOutlined className="text-xl" style={{ color: "#707070" }} />
    </Dropdown>
  );
};

