import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Divider, Layout, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { menu } from "./data";
import { ButtonComponent } from "../components/ButtonComponent";
import { BiLogOutCircle } from "react-icons/bi";
const logo = "/assets/images/logo.png";
const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Layout>
      <Sider
        style={{
          minHeight: "100vh",
          background: "#91caff14",
          width: collapsed ? "80px" : "300px",
          boxShadow: "1px 3px 5px rgb(0 0 0 / 38%)",
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={300}
      >
        <Content
          style={{
            height: "64px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              style={{
                width: collapsed ? "40px" : "150px",
                transition: "width 0.3s",
              }}
            />
          </Link>
        </Content>
        <Divider style={{ backgroundColor: "#292c3261" }} />

        {menu.map((item) => (
          <Content key={item.path}>
            <Content
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 20px",
              }}
            >
              <Link
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                }}
              >
                {item.icon}
                {!collapsed && (
                  <span style={{ color: "#000", marginLeft: "10px" }}>
                    {item.title}
                  </span>
                )}
              </Link>
            </Content>
            <Divider style={{ backgroundColor: "#292c3261" }} />
          </Content>
        ))}

        <ButtonComponent
          icon={<BiLogOutCircle />}
          buttonText={collapsed ? "" : "Log Out"}
          onClick={handleLogOut}
          block
          style={{
            position: "absolute",
            bottom: "10px",
            width: collapsed ? "80px" : "100%",
            textAlign: collapsed ? "center" : "left", 
            marginLeft: collapsed ? "0" : "30px",
            maxWidth: "250px",
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <ButtonComponent
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 44,
              height: 44,
              marginLeft: "20px",
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
