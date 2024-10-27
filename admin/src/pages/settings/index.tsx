import { Layout, Space } from "antd";
import Logo from "./Logo";

const { Content } = Layout;

const SettingsPage = () => {
  return (
    <Layout>
      <Content style={{ padding: "20px" }}>
        <Space direction="vertical" size="large">
          <Logo />
        </Space>
      </Content>
    </Layout>
  );
};

export default SettingsPage;
