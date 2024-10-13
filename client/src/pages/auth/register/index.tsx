import { FC, useState } from "react";
import { Form, Button, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputComponent from "../../../components/InputComponent";
import { useRegisterUserMutation } from "../../../store/api/user/user-api";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../../../validation/registerValidation";
import { ContentStyle, MainContentStyle } from "./style";

const { Title } = Typography;

interface IRegisterFormValues {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  confirmPassword: string;
  phone: string;
}

const Register: FC = () => {
  const [registerUser] = useRegisterUserMutation();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IRegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });

  const onSubmit = async (data: IRegisterFormValues) => {
    try {
      const res = await registerUser(data);
      console.log({ res });
      if (res?.data?.user) reset();
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Content
      style={MainContentStyle}
    >
      <Content
        style={ContentStyle}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#3e160e",
          }}
        >
          Register
        </Title>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="First Name"
            validateStatus={errors.firstName ? "error" : ""}
            help={errors.firstName?.message}
          >
            <InputComponent
              name="firstName"
              control={control}
              placeholder="First Name"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            validateStatus={errors?.lastName ? "error" : ""}
            help={errors?.lastName?.message}
          >
            <InputComponent
              name="lastName"
              control={control}
              placeholder="Last Name"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors?.email?.message}
          >
            <InputComponent
              name="email"
              control={control}
              placeholder="Email"
              prefix={<MailOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            validateStatus={errors?.phone ? "error" : ""}
            help={errors?.phone?.message}
          >
            <InputComponent
              name="phone"
              control={control}
              placeholder="Phone"
              prefix={<PhoneOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={errors?.password ? "error" : ""}
            help={errors?.password?.message}
          >
            <InputComponent
              name="password"
              control={control}
              placeholder="Password"
              prefix={<LockOutlined />}
              type={showPassword ? "text" : "password"}
              suffix={
                showPassword ? (
                  <EyeInvisibleOutlined
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOutlined onClick={() => setShowPassword(true)} />
                )
              }
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            validateStatus={errors.confirmPassword ? "error" : ""}
            help={errors.confirmPassword?.message}
          >
            <InputComponent
              name="confirmPassword"
              control={control}
              placeholder="Confirm Password"
              prefix={<LockOutlined />}
              type={showConfirmPassword ? "text" : "password"}
              suffix={
                showConfirmPassword ? (
                  <EyeInvisibleOutlined
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <EyeOutlined onClick={() => setShowConfirmPassword(true)} />
                )
              }
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Content>
  );
};

export default Register;
