import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {  Divider, Layout, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { menu } from "./data";
import { ButtonComponent } from "../components/ButtonComponent";
import Login from "../pages/auth/Login";
const logo = "/assets/images/logo.png";
const { Header, Sider, Content } = Layout;

const Sidenav: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      {/* <Sider
        style={{
          minHeight: "100vh",
          background: "#91caff14",
          width: "300px",
          boxShadow: "1px 3px 5px rgb(0 0 0 / 38%)",
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Content style={{ height: "64px" }}>
          <img src={logo} alt="logo" style={{ width: "150px" }} />
        </Content>
        <Divider style={{ backgroundColor: "#292c3261" }} />
        {menu.map((item) => (
          <Content>
            <Content
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
              <Link style={{ color: "#000" }} to={item.path}>
                {item.title}
              </Link>
            </Content>
            <Divider style={{ backgroundColor: "#292c3261" }} />
          </Content>
        ))}
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <ButtonComponent
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
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
      </Layout> */}
      <Login/>
    </Layout>
  );
};

export default Sidenav;
