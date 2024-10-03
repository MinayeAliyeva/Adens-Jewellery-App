import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useForm, Controller } from "react-hook-form";

const { Title } = Typography;

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
  } = useForm<ILoginFormValues>();
  console.log("rendr");

  const onSubmit = (data: ILoginFormValues) => {
    console.log(data);
    reset()
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
            <Controller
              name="firstname"
              control={control}
              rules={{ required: "Please input your firstname!" }}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<UserOutlined />}
                  placeholder="Firstname"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email ? errors.email.message : ""}
          >
            <Controller
              name="email"
              control={control}
              rules={{ required: "Please input your Email!" }}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<MailOutlined />}
                  placeholder="Email"
                />
              )}
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
