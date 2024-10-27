import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import {
  Layout,
  Avatar,
  Typography,
  Row,
  Col,
  Card,
  Button,
  Divider,
} from "antd";
import { getUserFromToken } from "../../shared/helpers/authStorage";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { setLogout } from "../../redux/features/authSlice";
import { IDecodedValue } from "../../shared/modules";

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const UserProfile = () => {
  const userData: IDecodedValue | null = getUserFromToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh", padding: "25px" }}>
      <Content style={{ padding: "40px" }}>
        <Row justify="center">
          <Col span={16}>
            <Card bordered={false} style={{ borderRadius: "12px" }}>
              <Row gutter={16}>
                <Col
                  span={6}
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    size={120}
                    icon={<UserOutlined />}
                    style={{ marginBottom: "16px" }}
                  />
                  <Title level={4}>
                    {userData?.firstName} {userData?.lastName}
                  </Title>
                </Col>
                <Col span={18}>
                  <Paragraph>
                    <strong>Email:</strong> {userData?.email}
                  </Paragraph>
                  <Paragraph>
                    <strong>Phone:</strong> {userData?.phone}
                  </Paragraph>

                  <Divider />

                  <Button
                    type="primary"
                    icon={<LogoutOutlined />}
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#3e160f",
                      borderColor: "#3e160f",
                    }}
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </Col>
              </Row>
            </Card>

            <Divider />
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©2024 Your Company - All Rights Reserved
      </Footer>
    </Layout>
  );
};

export default UserProfile;
