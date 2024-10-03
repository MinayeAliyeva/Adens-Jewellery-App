import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { Card, Form, Input, Button, Typography, Row, Col, Divider } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Contact = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <div style={{ padding: "50px", backgroundColor: "#f0f2f5",height:'100vh' }}>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Card
            style={{
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Title level={2}>Contact Details</Title>
            <Paragraph>
              If you have any questions, feel free to reach out to us by filling
              out the form below.
            </Paragraph>

            <Form layout="vertical" onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      { required: true, message: "Please enter your name!" },
                    ]}
                  >
                    <Input placeholder="Enter your name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Email"
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
                <Col span={8}>
                  <Form.Item
                    label="Phone"
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
              </Row>

              <Form.Item
                label="Message"
                name="message"
                rules={[
                  { required: true, message: "Please enter your message!" },
                ]}
              >
                <Input.TextArea rows={8} placeholder="Write your message" />
              </Form.Item>

              <Form.Item>
                <Row
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      width: "200px",
                      backgroundColor: "#40331D",
                      padding: "15px 20px",
                    }}
                  >
                    Send Message
                  </Button>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} sm={12}>
          <Card
            style={{
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              height: "544px",
              backgroundColor: "#F5F3EE",
              padding: "20px",
            }}
          >
            <Title style={{ fontSize: "15px", marginBottom: "16px" }} level={4}>
              Get In Touch
            </Title>

            <Typography style={{ fontWeight: "bold", marginBottom: "8px" }}>
              Email:
            </Typography>
            <Paragraph
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <MailOutlined style={{ marginRight: 8 }} />
              example@example.com
            </Paragraph>

            <Divider />

            <Typography style={{ fontWeight: "bold", marginBottom: "8px" }}>
              Phone:
            </Typography>
            <Paragraph
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <PhoneOutlined style={{ marginRight: 8 }} />
              +123 456 7890
            </Paragraph>

            <Divider style={{ margin: "16px 0" }} />

            <Typography style={{ fontWeight: "bold", marginBottom: "8px" }}>
              Address:
            </Typography>
            <Paragraph style={{ display: "flex", alignItems: "center" }}>
              <EnvironmentOutlined style={{ marginRight: 8 }} />
              Rains HQ, Jens Olsens Vej 13, 8200 Aarhus N
            </Paragraph>

            <Typography style={{ fontWeight: "bold", marginTop: "16px" }}>
              Follow Us:
            </Typography>
            <Paragraph style={{ marginTop: "8px" ,display:'flex',gap:'10px'}}>
              <FaFacebook />
              <FaTwitter />
              <IoLogoInstagram />
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
