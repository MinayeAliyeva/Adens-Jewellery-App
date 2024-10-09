import { Layout, Typography, Collapse, Row, Col, Button } from "antd";
import { FC } from "react";
// import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;

const FAQPage: FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "40px", backgroundColor: "#ffffff" }}>
        <Row justify="center">
          <Col span={20}> {/* Genişlik artırıldı */}
            <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
              Frequently Asked Questions
            </Title>
            <Collapse defaultActiveKey={["1"]} accordion>
              <Panel header="What payment methods do you accept?" key="1">
                <p>
                  We accept all major credit cards, PayPal, and bank transfers.
                </p>
              </Panel>
              <Panel header="How can I track my order?" key="2">
                <p>
                  You will receive an email with a tracking link once your order
                  is shipped.
                </p>
              </Panel>
              <Panel header="What is your return policy?" key="3">
                <p>
                  You can return any item within 30 days for a full refund,
                  provided it is in its original condition.
                </p>
              </Panel>
              <Panel header="Do you offer international shipping?" key="4">
                <p>
                  Yes, we ship worldwide. Shipping costs will be calculated at
                  checkout based on your location.
                </p>
              </Panel>
              <Panel header="How do I care for my jewelry?" key="5">
                <p>
                  To keep your jewelry looking its best, store it in a cool, dry
                  place and avoid exposure to harsh chemicals.
                </p>
              </Panel>
              <Panel header="Can I customize my order?" key="6">
                <p>
                  Yes, we offer customization options for certain items. Please
                  contact our customer service for more details.
                </p>
              </Panel>
              <Panel header="What if my jewelry gets damaged?" key="7">
                <p>
                  If your jewelry gets damaged, please reach out to our support
                  team. We offer repair services for most items.
                </p>
              </Panel>
              <Panel header="How long does shipping take?" key="8">
                <p>
                  Shipping typically takes 5-7 business days within the United
                  States. International shipping may take longer depending on
                  the destination.
                </p>
              </Panel>
            </Collapse>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Button
                type="primary"
                size="large"
                href="/contact"
                style={{ marginRight: "20px", padding: '10px 20px' }} // Buton boyutları artırıldı
              >
                Contact Us
              </Button>
              <Button type="default" size="large" href="/shop" style={{ padding: '10px 20px' }}>
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
