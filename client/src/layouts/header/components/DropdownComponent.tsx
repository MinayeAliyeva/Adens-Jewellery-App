import { FC, memo, ReactNode } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";

interface IItem {
  label: ReactNode;
  key: string;
}

interface IDropdownComponentProps {
  items: IItem[];
}

export const ProfileMenuComponent: FC<IDropdownComponentProps> = memo(
  ({ items }) => {
    const navigate = useNavigate();

    const handleMenuClick: MenuProps["onClick"] = (e) => {
      console.log("Clicked item key:", e.key); 

      if (e.key === "register") {
        navigate("/register");
      } else if (e.key === "login") {
        navigate("/login");
      }
    };

    const menu = (
      <Menu onClick={handleMenuClick}>
        {items.map((item) => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={["click"]}>
        <UserOutlined className="text-xl" style={{ color: "#707070" }} />
      </Dropdown>
    );
  }
);
