import { Card, Row, Col, Typography, Divider, Tag } from "antd";
import { isEmpty } from "lodash";
import { IOrder, IOrderResponse } from "./modules";
import OrderListComponent from "./OrderListComponent";
import { FC, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";

const { Text, Title } = Typography;

interface IProps {
  userOrders: IOrderResponse;
  deleteOrderById: (id: string) => void;
}

const OrderDetails: FC<IProps> = ({ userOrders, deleteOrderById }) => {
  const [loading, setLoading] = useState(false);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: "60vh",
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        loader={<h4></h4>}
        dataLength={userOrders.orders.length}
        next={loadMoreData}
        hasMore={userOrders.orders.length < 50}
        scrollableTarget="scrollableDiv"
      >
        {isEmpty(userOrders.orders) ? (
          <Title
            level={4}
            style={{ color: "#3d3d3d", marginBottom: 12, textAlign: "center" }}
          >
            No Orders
          </Title>
        ) : (
          <Row gutter={[32, 32]}>
            {userOrders.orders.map((order: IOrder) => (
              <Col style={{ width: "100%" }} key={order._id}>
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
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <MdDelete
                      style={{
                        fontSize: "20px",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteOrderById(order._id)}
                    />
                  </div>

                  <Row justify="space-between" align="middle">
                    <Col>
                      <Title
                        level={4}
                        style={{ color: "#3d3d3d", marginBottom: 12 }}
                      >
                        <Tag color="green" style={{ fontSize: "14px" }}>
                          {order.status}
                        </Tag>
                      </Title>
                      <Text
                        type="secondary"
                        style={{ display: "block", marginBottom: 4 }}
                      >
                        Shipping Address:{" "}
                        <span style={{ color: "#3d3d3d" }}>
                          {order.shippingAddress}
                        </span>
                      </Text>
                      <Text
                        type="secondary"
                        style={{ display: "block", marginBottom: 4 }}
                      >
                        Order NO:{" "}
                        <span style={{ color: "#3d3d3d" }}>{order._id}</span>
                      </Text>
                      <Text type="secondary" style={{ display: "block" }}>
                        Created:{" "}
                        <span style={{ color: "#3d3d3d" }}>
                          {order.createdAt}
                        </span>
                      </Text>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      <Text type="secondary">Total Amount:</Text>{" "}
                      <Text
                        strong
                        style={{ fontSize: "16px", color: "#3d3d3d" }}
                      >
                        {order.totalAmount} $
                      </Text>
                      <br />
                      <Text type="secondary">Shipping Fee:</Text>{" "}
                      <Text style={{ color: "#595959" }}>
                        {order.shippingFee} $
                      </Text>
                    </Col>
                  </Row>
                  <Divider style={{ margin: "20px 0" }} />
                  <OrderListComponent data={order.productItems} />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default OrderDetails;
