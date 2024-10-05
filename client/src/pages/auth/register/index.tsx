import { FC } from "react";
import { Form, Button, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputComponent from "../../../components/InputComponent";
import { useRegisterUserMutation } from "../../../store/api/user/user-api"; 

const { Title } = Typography;

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

interface IRegisterFormValues {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  confirmPassword: string;
}

const Register: FC = () => {
  const [registerUser] = useRegisterUserMutation(); 
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IRegisterFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IRegisterFormValues) => {
    console.log("data",data);
    
    try {
      await registerUser(data); 
      reset(); 
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Content
      style={{
        background: `url("/assets/images/bg.jpg") no-repeat center center/cover`,
        borderRadius: "10px",
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
            validateStatus={errors.lastName ? "error" : ""}
            help={errors.lastName?.message}
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
            help={errors.email?.message}
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
            help={errors.password?.message}
          >
            <InputComponent
              name="password"
              control={control}
              placeholder="Password"
              prefix={<LockOutlined />}
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
