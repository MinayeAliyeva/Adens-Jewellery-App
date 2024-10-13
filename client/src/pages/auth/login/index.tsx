import { Form, Button, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputComponent from "../../../components/InputComponent";
import { useLoginUserMutation } from "../../../store/api/user/user-api";
import { useNavigate } from "react-router-dom";
import { ContentStyle, MainContentStyle } from "./style";
import { loginSchema } from "../../../validation/loginValidation";

const { Title } = Typography;


interface ILoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const onSubmit = (data: ILoginFormValues) => {
    console.log("ONSUBMIT");

    try {
      console.log("try");

      loginUser({
        email: data.email,
        password: data.password,
      }).then((res) => {
        console.log({ res });

        localStorage.setItem("token", res.data);
      });

      navigate("/");
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <Content style={MainContentStyle}>
      <Content style={ContentStyle}>
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
