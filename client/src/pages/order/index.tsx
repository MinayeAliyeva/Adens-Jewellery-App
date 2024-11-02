import { Layout, Card, Row, Col, Typography, Divider, Tag, Avatar } from "antd";

const {  Content } = Layout;
const { Text } = Typography;

export const OrderComponent = () => {
  const orderData = {
    success: true,
    message: "Order created",
    order: {
      _id: "672239591d41739f4b317d36",
      userId: {
        _id: "671e74bc1b4cee4bf4a6e3b3",
        firstName: "User1",
        lastName: "Userov",
        phone: "+1 (964) 708-1882",
        email: "user1@mail.ru",
      },
      productItems: [
        {
          productId: {
            productName: "Cullen Terry",
            size: ["M", "L"],
            price: 287,
            color: "Aspernatur qui porro",
            mainImageUrl:
              "http://localhost:8080/public/images/1729783304060_product5.jpg",
          },
          quantity: 1,
          _id: "672239591d41739f4b317d37",
        },
        {
          productId: {
            productName: "Brenden Rogers",
            size: ["M"],
            price: 53,
            color: "Nulla ullam non id o",
            mainImageUrl:
              "http://localhost:8080/public/images/1729783340272_product6.jpg",
          },
          quantity: 2,
          _id: "672239591d41739f4b317d38",
        },
      ],
      shippingAddress: "SEMKIR",
      totalAmount: 393,
      status: "pending",
      createdAt: "2024-10-30T13:49:13.267Z",
    },
  };

  const { order } = orderData;

  return (
    <Layout>
      <Content>
        <Card style={{ marginBottom: "20px" }}>
          <Row
            align="middle"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Col>
              <Text strong>Order No: </Text>
              <Text>{order._id}</Text>
            </Col>
            <Col>
              <Text strong>Order Status: </Text>
              <Tag color={order.status === "pending" ? "orange" : "green"}>
                {order.status === "pending" ? "Pending" : "Completed"}
              </Tag>
            </Col>
            <Col>
              <Text strong>Total Amount: </Text>
              <Text>{order.totalAmount}₺</Text>
            </Col>
          </Row>
          <Divider />

          {order?.productItems?.map?.((item: any) => (
            <Row key={item._id} align="middle" style={{ marginBottom: "10px" }}>
              <Col span={4}>
                <Avatar
                  shape="square"
                  size={64}
                  src={item.productId.mainImageUrl}
                />
              </Col>
              <Col span={12}>
                <Text>{item.productId.productName}</Text>
                <br />
                <Text type="secondary">
                  Color: {item.productId.color} | Size:{" "}
                  {item.productId.size.join(", ")}
                </Text>
              </Col>
              <Col span={4}>
                <Text>Price: {item.productId.price}₺</Text>
                <br />
                <Text>Quantity: {item.quantity}</Text>
              </Col>
              <Col span={4}>
                <Text strong>
                  Total: {item.productId.price * item.quantity}₺
                </Text>
              </Col>
            </Row>
          ))}
          <Divider />

          <Row justify="space-between">
            <Col>
              <Text strong>Shipping Address:</Text>
              <Text> {order.shippingAddress}</Text>
            </Col>
            <Col>
              <Text strong>Order Date:</Text>
              <Text> {new Date(order.createdAt).toLocaleDateString()}</Text>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};
