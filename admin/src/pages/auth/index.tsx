import {
  Form,
  Input,
  Row,
  Col,
  Card,
  Layout,
  Spin,
  Image,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { RiLoginCircleLine } from "react-icons/ri";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useLazyGetAdminLoginQuery } from "../../store/api/admin/admin-api";
import { ButtonComponent } from "../../utils/components/ButtonComponent";
import * as yup from "yup";

import TranslateComponent from "../../utils/components/TranslateComponent";
import { useTranslation } from "react-i18next";
import { useGetLogoQuery } from "../../store/api/setting/setting-api";
import { ruleAuth } from "./data";
const bg = "/assets/images/bg.png";
const logo = "/assets/images/logo.png";

const Login = () => {
  const { t } = useTranslation();
  const { rule, schema } = ruleAuth(t);
  const [getAdmin, { isLoading }] = useLazyGetAdminLoginQuery();
  const { data: logoData, isLoading: isLoadingLogo } = useGetLogoQuery();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      await schema.validate(values);
      getAdmin(values).then((res: any) => {
        if (res.error) {
          message.error(res.error.data);
          return;
        }

        if (!res.data) return;
        localStorage.setItem("token", res.data);
        message.success("Succsesufly Login!!!");
        navigate("/products");
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        message.error("Error");
      }
    }
  };

  const logoUrl = logoData?.[0]?.currentlyLogo || logo;
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
          style={{
            width: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoadingLogo ? (
            <Spin />
          ) : (
            <Image preview={false} src={logoUrl} alt="logo" loading="lazy" />
          )}
        </Content>
        <Card
          style={{
            width: "400px",
            borderRadius: "10px",
          }}
        >
          <Form name="login" onFinish={onFinish} layout="vertical">
            <Form.Item name="email" rules={rule.emailRules}>
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder={t("Email")}
                className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </Form.Item>

            <Form.Item name="password" rules={rule.passwordRules}>
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder={t("Password")}
                className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </Form.Item>

            <Layout
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
              }}
            >
              <Content
                style={{ display: "flex", gap: "20px", marginBottom: "10px " }}
              >
                <TranslateComponent />
              </Content>
            </Layout>

            <Form.Item>
              <ButtonComponent
                icon={<RiLoginCircleLine />}
                buttonText={t("Login")}
                loading={isLoading}
                htmlType="submit"
                block
                style={{
                  borderRadius: "5px",
                  margin: "0 auto",
                }}
              />
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
