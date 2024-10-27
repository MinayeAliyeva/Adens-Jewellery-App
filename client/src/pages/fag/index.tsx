import { Layout, Typography, Collapse, Row, Col, Button } from "antd";
import { FC } from "react";
import { panels } from "./data";

const { Content } = Layout;
const { Title } = Typography;

const FAQPage: FC = () => {

  return (
    <Layout>
      <Content
        style={{
          padding: "40px",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row justify="center">
          <Col style={{ width: "1500px" }}>
            <Title
              level={2}
              style={{ textAlign: "center", marginBottom: "40px" }}
            >
              Frequently Asked Questions
            </Title>
            <Collapse
              defaultActiveKey={["1"]}
              accordion
              items={panels?.map(panel => ({
                key: panel.key,
                label: panel.header,
                children: <p>{panel.content}</p>
              }))}
            />
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Button
                type="primary"
                size="large"
                href="/contact"
                style={{
                  marginRight: "20px",
                  padding: "10px 20px",
                  backgroundColor: "rgb(64, 51, 29)",
                }}
              >
                Contact Us
              </Button>
              <Button
                type="default"
                size="large"
                href="/shop"
                style={{
                  padding: "10px 20px",
                  color: "rgb(64, 51, 29)",
                }}
              >
                Shop Now
              </Button>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default FAQPage;
