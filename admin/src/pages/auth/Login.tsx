import React from "react";
import { Form, Input, Button, Typography, Row, Col, Card, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useLazyGetAdminLoginQuery } from "../../store/api/admin/admin-api";
import { jwtDecode } from "jwt-decode";

const bg = "/assets/images/bg.png";
const { Title } = Typography;

const Login = () => {
  const [getAdmin, {data, isLoading}] = useLazyGetAdminLoginQuery();
  console.log("LOGIN DATA", data);
  
  const onFinish = (value: {email: string, password: string}) => {
    console.log(value);
    getAdmin(value).then(res=>{
      console.log({res});
      
      if(!res.data) return;

      localStorage.setItem("token", res.data);
      const decoded = jwtDecode(res.data as string);
  console.log({decoded});
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
          style={{ width: "20px" }}
        >
          AAAAAA
        </Content>
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
              <Button
                htmlType="submit"
                block
                style={{
                  borderRadius: "5px",
                  width: "200px",
                  margin: "0 auto",
                }}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
