import { Form, Input, Typography, Row, Col, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useLazyGetAdminLoginQuery } from "../../store/api/admin/admin-api";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../../components/ButtonComponent";
import { RiLoginCircleLine } from "react-icons/ri";
const bg = "/assets/images/bg.png";
const { Title } = Typography;

const Login = () => {
  const [getAdmin, { data, isLoading }] = useLazyGetAdminLoginQuery();
  const navigate = useNavigate();
  console.log("LOGIN DATA", data);

  const onFinish = (value: { email: string; password: string }) => {
    console.log(value);
    getAdmin(value).then((res) => {
      console.log({ res });
      if (!res.data) return;
      localStorage.setItem("token", res.data);
      navigate("/products");
    });
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Col
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          display: "flex",
          alignItems: "center",
        }}
        xs={24}
        sm={24}
        md={12}
      >
        <Content style={{ width: "20px" }}>AAAAAA</Content>
        <Card
          style={{
            width: "400px", // Adjusted width of the card
            borderRadius: "10px", // Optional: for rounded corners
          }}
        >
          <Title level={2} style={{ textAlign: "center", color: "white" }}>
            Admin Girişi
          </Title>
          <Form name="login" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Kullanıcı email girin!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Kullanıcı Emaili"
                style={{ padding: "10px" }}
                className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Parolanızı girin!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Parola"
                style={{ padding: "10px" }}
                className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </Form.Item>

            <Form.Item>
              <ButtonComponent
                icon={<RiLoginCircleLine />}
                buttonText="Login"
                loading={isLoading}
                htmlType="submit"
              
                block
                style={{
                  borderRadius: "5px",
                  margin: "0 auto",
                }}
              />
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
