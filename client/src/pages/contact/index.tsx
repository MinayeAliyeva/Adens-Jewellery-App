import { Card, Form, Input, Button, Typography, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

const Contact = () => {
  const onFinish = (values: any) => {};
  const { t } = useTranslation();
  return (
    <Content
      style={{
        padding: "50px",
        backgroundColor: "#f0f2f5",
        height: "100vh",
      }}
    >
      <Row
        gutter={16}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col xs={24} sm={16} md={12}>
          <Card
            style={{
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              padding: "30px",
              marginBottom: "30px",
              marginTop: "150px",
            }}
          >
            <Title level={2} style={{ textAlign: "center" }}>
              {t("Contact Us")}
            </Title>
            <Paragraph style={{ textAlign: "center" }}>
              {t(
                "If you have any questions, feel free to reach out to us by filling out the form below."
              )}
            </Paragraph>

            <Form layout="vertical" onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={t("Name")}
                    name="name"
                    rules={[
                      { required: true, message: "Please enter your name!" },
                    ]}
                  >
                    <Input placeholder="Enter your name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={t("Email")}
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your email address!",
                      },
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={t("Phone")}
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone number!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your phone number" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={t("Address")}
                    name="address"
                    rules={[
                      { required: true, message: "Please enter your address!" },
                    ]}
                  >
                    <Input placeholder="Enter your address" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label={t("Message")}
                name="message"
                rules={[
                  { required: true, message: "Please enter your message!" },
                ]}
              >
                <Input.TextArea rows={6} placeholder="Write your message" />
              </Form.Item>

              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: "#40331D",
                    padding: "10px 30px",
                    borderRadius: "5px",
                    fontSize: "16px",
                  }}
                >
                  {t("Send Message")}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Contact;
