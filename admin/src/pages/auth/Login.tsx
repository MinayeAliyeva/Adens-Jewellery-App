import { Form, Input, Typography, Row, Col, Card, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useLazyGetAdminLoginQuery } from "../../store/api/admin/admin-api";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../../components/ButtonComponent";
import { RiLoginCircleLine } from "react-icons/ri";
import * as yup from "yup";
import InputComponent from "../../components/InputComponent";
const bg = "/assets/images/bg.png";
const logo = "/assets/images/logo.png";
const az = "/assets/images/az.svg";
const en = "/assets/images/en.svg";
const { Title } = Typography;
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});
const Login = () => {
  const [getAdmin, { data, isLoading }] = useLazyGetAdminLoginQuery();
  
  const navigate = useNavigate();
  console.log("LOGIN DATA", data);

  const onFinish = (value: { email: string; password: string }) => {
    console.log(value);
    getAdmin(value).then((res) => {
      console.log({ res });
      if (!res.data) return;
      console.log("res.data",res.data);
      
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
        <Content
          style={{
            width: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={logo} alt="" style={{ width: "300px" }} />
        </Content>
        <Card
          style={{
            width: "400px",
            borderRadius: "10px",
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
                size="large"
                prefix={<UserOutlined />}
                placeholder="Kullanıcı Emaili"
                className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
             
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Parolanızı girin!" }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Parola"
                className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </Form.Item>
            <Layout
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
              }}
            >
              <Content
                style={{ display: "flex", gap: "20px", marginBottom: "10px " }}
              >
                <img style={{ width: "50px" }} src={az} alt="" />
                <img style={{ width: "50px" }} src={en} alt="" />
              </Content>
            </Layout>

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
