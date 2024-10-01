import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Divider, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { menu } from './data';

const { Header, Sider, Content } = Layout;

const Sidenav: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider  style={{minHeight: '100vh'}} trigger={null} collapsible collapsed={collapsed}>
        <Content style={{height: '64px', backgroundColor: 'blue'}}>
            LOGO
        
            </Content>
        {/* <div className="demo-logo-vertical" /> */}
        <Divider style={{backgroundColor:'red'}}/>
        {
           
            menu.map(item=>(<Content>
                {
                    item.icon
                }
                <Link to={item.path}>{item.title}</Link>
                <Divider style={{backgroundColor:'red'}}/>
            </Content>))
        }
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidenav;