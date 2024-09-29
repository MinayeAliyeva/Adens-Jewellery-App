import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { Formik } from "formik";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginValidationSchema } from "../../../validation/loginValidation";
import { Content } from "antd/es/layout/layout";

const { Title } = Typography;

const Login: React.FC = () => {
  const onFinish = (values: any, { resetForm }: any) => {
    console.log("Received values from form: ", values);
    resetForm();
  };

  return (
    <Content
      style={{
        background: `url("/assets/images/bg.jpg") no-repeat center center/cover`,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Content
        style={{
          maxWidth: "400px",
          margin: "auto",
          padding: "50px",
          background: "#84787840",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.36) 0px 4px 8px",
        }}
      >
        <Title
          level={2}
          style={{ textAlign: "center", marginBottom: "40px", color: "#fff" }}
        >
          Login
        </Title>

        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={onFinish}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="Username"
                validateStatus={
                  touched.username && errors.username ? "error" : ""
                }
                help={touched.username && errors.username}
                style={{ color: "#fff" }}
              >
                <Input
                  name="username"
                  prefix={<UserOutlined />}
                  placeholder="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                validateStatus={
                  touched.password && errors.password ? "error" : ""
                }
                help={touched.password && errors.password}
                style={{ color: "#fff" }}
              >
                <Input.Password
                  name="password"
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#3e160e",
                    borderColor: "#3e160e",
                    borderRadius: "5px",
                  }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Content>
    </Content>
  );
};

export default Login;
