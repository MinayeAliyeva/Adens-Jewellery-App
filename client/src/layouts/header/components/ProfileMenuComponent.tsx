import { Dropdown, Menu, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { menuItems } from "../constants";
import { setLogout } from "../../../redux/features/authSlice";
import { useDispatch } from "react-redux";

export const ProfileMenuComponent = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if(e.key === "logout"){
      handleLogout();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick} style={{width: "170px"}}>
      {menuItems?.map((item:any) => (
        <Menu.Item key={item.key} className="cursor-pointer w-17.5">{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <UserOutlined className="text-xl" style={{ color: "#707070" }} />
    </Dropdown>
  );
};
