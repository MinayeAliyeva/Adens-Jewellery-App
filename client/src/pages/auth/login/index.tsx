import React from "react";
import { Form, Button, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputComponent from "../../../components/InputComponent";
import { useLoginUserMutation } from "../../../store/api/user/user-api";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface ILoginFormValues {
  email: string;
  password: string;
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

  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const onSubmit = async (data: ILoginFormValues) => {
    try {
      const token = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();

      console.log("token", token);
      localStorage.setItem("authToken", token.token);

      navigate("/");
    } catch (error) {
      console.error("Login error", error);
    }
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
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email ? errors.email.message : ""}
          >
            <InputComponent
              name="email"
              control={control}
              placeholder="Email"
              prefix={<MailOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password ? errors.password.message : ""}
          >
            <InputComponent
              name="password"
              control={control}
              placeholder="Password"
              prefix={<LockOutlined />}
              type="password"
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
