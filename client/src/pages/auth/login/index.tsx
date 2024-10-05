import React from "react";
import { Form, Button, Typography } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputComponent from "../../../components/InputComponent";

const { Title } = Typography;

const schema = yup.object().shape({
  firstname: yup.string().required("First Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
});

interface ILoginFormValues {
  firstname: string;
  email: string;
}

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    resolver: yupResolver(schema), 
  });

  console.log("render LOGIN");

  const onSubmit = (data: ILoginFormValues) => {
    console.log(data);
    reset();
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
          maxWidth: "500px",
          padding: "40px",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.3) 0px 4px 20px",
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#3e160e",
          }}
        >
          Login
        </Title>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="First Name"
            validateStatus={errors.firstname ? "error" : ""}
            help={errors.firstname ? errors.firstname.message : ""}
          >
            <InputComponent
              name="firstname"
              control={control}
              placeholder="Firstname"
              prefix={<UserOutlined />}
              rules={{ required: "First Name is required" }} 
            />
          </Form.Item>

          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email ? errors.email.message : ""}
          >
            <InputComponent
              name="email"
              control={control}
              placeholder="Email"
              prefix={<MailOutlined />}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              }} 
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
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Content>
  );
};

export default Login;
