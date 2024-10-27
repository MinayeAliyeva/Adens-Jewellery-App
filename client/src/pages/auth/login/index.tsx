import { Form, Typography, Alert, message } from "antd";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdLogIn } from "react-icons/io";

import { useLoginUserMutation } from "../../../redux/api/user/user-api";
import { ContentStyle, MainContentStyle } from "./style";
import { loginSchema } from "../../../validation/loginValidation";
import { setLogin } from "../../../redux/features/authSlice";
import { saveToLocalStorage } from "../../../shared/helpers/localStorageUtil";
import { useTranslation } from "react-i18next";
import PasswordInputComponent from "../../../shared/components/form-components/PasswordInputComponent";
import ButtonComponent from "../../../shared/components/form-components/ButtonComponent";
import InputComponent from "../../../shared/components/form-components/InputComponent";

const { Title } = Typography;

interface ILoginFormValues {
  email: string;
  password: string;
  error?: string;
}

const Login: React.FC = () => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<ILoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const [loginUser, { isLoading: isLoadingLogin }] = useLoginUserMutation();
  const navigate = useNavigate();

  const onSubmit = (data: ILoginFormValues) => {
    try {
      loginUser({
        email: data.email,
        password: data.password,
      }).then((res: any) => {
        if (!isEmpty(res?.error)) {
          setError("error", {
            type: "server",
            message: res?.error?.data,
          });
          return;
        }
        reset();
        saveToLocalStorage("token", res.data);
        dispatch(setLogin());
        navigate("/home");
      });
    } catch (error) {
      message.error("Something went wrong!!!");
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
          {t("Login")}
        </Title>
        {errors?.error?.message && (
          <Alert
            message={errors?.error?.message}
            type="error"
            style={{ marginBottom: "20px" }}
          />
        )}

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label={t("Email")}
            validateStatus={errors.email ? "error" : ""}
            help={errors.email ? errors.email.message : ""}
          >
            <InputComponent
              name="email"
              control={control}
              placeholder={t("Email")}
              prefix={<MailOutlined />}
            />
          </Form.Item>

          <Form.Item
            label={t("Password")}
            validateStatus={errors.password ? "error" : ""}
            help={errors.password ? errors.password.message : ""}
          >
            <PasswordInputComponent
              control={control}
              name="password"
              placeholder={t("Password")}
              prefix={<LockOutlined />}
              type="password"
            />
          </Form.Item>

          <Form.Item>
            <ButtonComponent
              icon={<IoMdLogIn />}
              buttonText={t("Login")}
              htmlType="submit"
              loading={isLoadingLogin}
              style={{
                width: "100%",
                backgroundColor: "#3e160e",
                borderColor: "#3e160e",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            />
          </Form.Item>
        </Form>
      </Content>
    </Content>
  );
};

export default Login;
