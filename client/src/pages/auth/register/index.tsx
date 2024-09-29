import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { Formik } from "formik";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { registerValidationSchema } from "../../../validation/registerValidation";
import { Content } from "antd/es/layout/layout";

const { Title } = Typography;

const Register: React.FC = () => {
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
          Register
        </Title>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerValidationSchema}
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
                label="First Name"
                validateStatus={
                  touched.firstName && errors.firstName ? "error" : ""
                }
                help={touched.firstName && errors.firstName}
                style={{ color: "#fff" }}
              >
                <Input
                  name="firstName"
                  prefix={<UserOutlined />}
                  placeholder="First Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
              </Form.Item>

              <Form.Item
                label="Last Name"
                validateStatus={
                  touched.lastName && errors.lastName ? "error" : ""
                }
                help={touched.lastName && errors.lastName}
                style={{ color: "#fff" }}
              >
                <Input
                  name="lastName"
                  prefix={<UserOutlined />}
                  placeholder="Last Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                validateStatus={touched.email && errors.email ? "error" : ""}
                help={touched.email && errors.email}
                style={{ color: "#fff" }}
              >
                <Input
                  name="email"
                  prefix={<MailOutlined />}
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
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

              <Form.Item
                label="Confirm Password"
                validateStatus={
                  touched.confirmPassword && errors.confirmPassword
                    ? "error"
                    : ""
                }
                help={touched.confirmPassword && errors.confirmPassword}
                style={{ color: "#fff" }}
              >
                <Input.Password
                  name="confirmPassword"
                  prefix={<LockOutlined />}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
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
                  Register
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Content>
    </Content>
  );
};

export default Register;
