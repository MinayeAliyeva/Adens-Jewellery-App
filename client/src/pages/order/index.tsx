import { Card, Row, Col, Typography, Divider, Avatar, Tag } from "antd";
import { IOrder } from "./modules";
import { FC } from "react";

const { Text, Title } = Typography;

export const OrderComponent: FC<any> = ({ userOrders }) => {
  return (
    <Card
      style={{ backgroundColor: "#f4f6f8", padding: "40px", border: "none" }}
    >
      <Row gutter={[32, 32]}>
        {userOrders?.orders?.map((order: IOrder) => (
          <Col style={{ width: "100%" }} key={order?._id}>
            <Card
              bordered={false}
              style={{
                borderRadius: "12px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                padding: "24px",
                backgroundColor: "#ffffff",
                width: "100%",
              }}
            >
              <Row justify="space-between" align="middle">
                <Col>
                  <Title
                    level={4}
                    style={{ color: "#3d3d3d", marginBottom: 12 }}
                  >
                    <Tag color="green" style={{ fontSize: "14px" }}>
                      {order?.status}
                    </Tag>
                  </Title>
                  <Text
                    type="secondary"
                    style={{ display: "block", marginBottom: 4 }}
                  >
                    Shipping Address:{" "}
                    <span style={{ color: "#3d3d3d" }}>
                      {order?.shippingAddress}
                    </span>
                  </Text>
                  <Text
                    type="secondary"
                    style={{ display: "block", marginBottom: 4 }}
                  >
                    Order NO:{" "}
                    <span style={{ color: "#3d3d3d" }}>{order?._id}</span>
                  </Text>
                  <Text type="secondary" style={{ display: "block" }}>
                    Created:{" "}
                    <span style={{ color: "#3d3d3d" }}>{order?.createdAt}</span>
                  </Text>
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <Text type="secondary">Total Amount:</Text>{" "}
                  <Text strong style={{ fontSize: "16px", color: "#3d3d3d" }}>
                    {order?.totalAmount} $
                  </Text>
                  <br />
                  <Text type="secondary">Shipping Fee:</Text>{" "}
                  <Text style={{ color: "#595959" }}>
                    {order?.shippingFee} $
                  </Text>
                </Col>
              </Row>
              <Divider style={{ margin: "20px 0" }} />

              <Row gutter={[16, 16]}>
                {order?.productItems?.map((item) => (
                  <Col span={24} key={item?.productId}>
                    <Card
                      hoverable
                      bordered={false}
                      style={{
                        backgroundColor: "#fafafa",
                        borderRadius: "10px",
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
                        padding: "16px",
                      }}
                    >
                      <Row align="middle" gutter={[16, 0]}>
                        <Col>
                          <Avatar
                            shape="square"
                            size={64}
                            src={item.productId.mainImageUrl}
                            style={{
                              border: "1px solid #d9d9d9",
                              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
                            }}
                          />
                        </Col>
                        <Col flex="auto">
                          <Title
                            level={5}
                            style={{
                              margin: 0,
                              fontSize: "16px",
                              color: "#3d3d3d",
                            }}
                          >
                            {item?.productId?.productName}
                          </Title>
                          <Text
                            type="secondary"
                            style={{
                              fontSize: "14px",
                              display: "block",
                              marginTop: 4,
                            }}
                          >
                            Quantity: {item?.quantity}
                          </Text>
                          <Text
                            style={{
                              fontSize: "14px",
                              display: "block",
                              marginTop: 4,
                            }}
                          >
                            Price: {item?.productId?.price} USD
                          </Text>
                          <Text
                            type="secondary"
                            style={{
                              fontSize: "14px",
                              display: "block",
                              marginTop: 4,
                            }}
                          >
                            Color: {item?.productId?.color}
                          </Text>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};
