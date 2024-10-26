import { Layout, Button, Space } from "antd";
import Logo from "./Logo";

const { Content } = Layout;

const SettingsPage = () => {
  return (
    <Layout style={{ minHeight: "100vh", justifyContent: "center", alignItems: "center" }}>
      <Content style={{ padding: "20px", textAlign: "center" }}>
        <Space direction="vertical" size="large">
          <Logo />
         
          {/* <Button type="default" size="large">Default Language</Button>
          <Button type="dashed" size="large">Dark Light Mode</Button> */}
        </Space>
      </Content>
    </Layout>
  );
};

export default SettingsPage;
