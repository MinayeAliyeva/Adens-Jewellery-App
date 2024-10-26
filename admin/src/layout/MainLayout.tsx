import TranslateComponent from "../utils/components/TranslateComponent";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Col, Divider, Image, Layout, Row, Spin, theme } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ButtonComponent } from "../utils/components/ButtonComponent";
import { menu } from "./data";
import { useGetLogoQuery } from "../store/api/setting/setting-api";

const logo = "/assets/images/logo.png";
const { Header, Sider, Content } = Layout;
const bg = "/assets/images/bg.png";

const MainLayout: React.FC = () => {
  const { t } = useTranslation();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { data: logoData, isLoading } = useGetLogoQuery();
  const logoUrl = logoData?.[0]?.currentlyLogo || logo;
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
          {isLoading ? (
            <Spin />
          ) : (
            <Link to="/">
              <Image
                preview={false}
                src={logoUrl}
                alt="logo"
                loading="lazy"
                style={{
                  width: collapsed ? "50px" : "150px",
                  transition: "width 0.3s",
                  height: logoData?.[0]?.currentlyLogo ? "70px" : "auto",
                }}
              />
            </Link>
          )}
        </Content>
        <Divider style={{ backgroundColor: "#292c3261" }} />

        {menu?.map((item) => (
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
                    {t(`${item.title}`)}
                  </span>
                )}
              </Link>
            </Content>
            <Divider style={{ backgroundColor: "#292c3261" }} />
          </Content>
        ))}

        <ButtonComponent
          icon={<BiLogOutCircle />}
          buttonText={collapsed ? "" : t("Log Out")}
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
        <Header
          style={{
            backgroundImage: `url(${bg})`,
            padding: 0,
            backgroundColor: colorBgContainer,
          }}
        >
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Col span={12}>
              <ButtonComponent
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapsed}
                style={{
                  fontSize: "16px",
                  width: 44,
                  height: 44,
                  marginLeft: "20px",
                }}
              />
            </Col>
            <Col
              span={12}
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "10px ",
                paddingRight: "25px",
                justifyContent: "flex-end",
              }}
            >
              <TranslateComponent />
            </Col>
          </Row>
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
