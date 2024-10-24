import {
  Layout,
  Avatar,
  Typography,
  Row,
  Col,
  Card,
  Button,
  Divider,
  List,
} from "antd";
import { getUserFromToken } from "../../shared/helpers/authStorage";
import { useEffect } from "react";
import { useLazyGetFavoriteByUserIdQuery } from "../../redux/api/favorite/favorite-api";
import { useSelector } from "react-redux";
import { getUserFavoriteProductCountSelector } from "../../redux/store";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useLazyGetBasketByUserIdQuery } from "../../redux/api/basket/basket-api";
import { IBasketResponse } from "../../redux/api/basket/modules";

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

interface IDecodedValue {
  isAdmin: boolean;
  _id: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email: string;
}

const UserProfile = () => {
  const userData: IDecodedValue | null = getUserFromToken();
  const favoriteCount = useSelector(getUserFavoriteProductCountSelector);
  const [
    getUserFavoriteData,
    { data: userFavoriteDate, isFetching: isFetchingUserFavorite },
  ] = useLazyGetFavoriteByUserIdQuery();
  const [getBasket, { data: basketData, isLoading: isLoadingBasket }] =
    useLazyGetBasketByUserIdQuery<{
      data: IBasketResponse;
      isLoading: boolean;
    }>();

  useEffect(() => {
    if (userData?._id) {
      getUserFavoriteData({ userId: userData?._id ?? "" });
    }
  }, [userData?._id, favoriteCount]);
  useEffect(() => {
    if (userData?._id) {
      getBasket({ id: userData?._id ?? "" });
    }
  }, [userData?._id]);
  console.log("basketData", basketData);

  return (
    <Layout style={{ minHeight: "100vh", padding: "25px" }}>
      <Content style={{ padding: "40px" }}>
        <Row justify="center">
          <Col span={16}>
            <Card bordered={false} style={{ borderRadius: "12px" }}>
              <Row gutter={16}>
                <Col
                  span={6}
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    size={120}
                    icon={<UserOutlined />}
                    style={{ marginBottom: "16px" }}
                  />
                  <Title level={4}>
                    {userData?.firstName} {userData?.lastName}
                  </Title>
                </Col>
                <Col span={18}>
                  <Paragraph>
                    <strong>Email:</strong> {userData?.email}
                  </Paragraph>
                  <Paragraph>
                    <strong>Phone:</strong> {userData?.phone}
                  </Paragraph>

                  <Divider />

                  <Button
                    type="primary"
                    icon={<LogoutOutlined />}
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#3e160f",
                      borderColor: "#3e160f",
                    }}
                  >
                    Log Out
                  </Button>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col span={24}>
                  <Title level={4}>
                    Favore Products Caunt :{favoriteCount}
                  </Title>
                  <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={userFavoriteDate?.products || []}
                    renderItem={(product) => (
                      <List.Item>
                        <img
                          style={{
                            borderRadius: "50%",
                            width: "150px",
                            height: "150px",
                          }}
                          alt={product?.productId?.productName}
                          src={product?.productId?.mainImageUrl}
                        />
                        <Card.Meta title={product?.productId?.productName} />
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col span={24}>
                  <Title level={4}>
                    Basket Products count {basketData?.products?.length}
                  </Title>
                  <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={basketData?.products || []}
                    renderItem={(product) => (
                      <List.Item>
                        <img
                          style={{
                            borderRadius: "50%",
                            width: "150px",
                            height: "150px",
                          }}
                          alt={product?.productId?.productName}
                          src={product?.productId?.mainImageUrl}
                        />
                        <Card.Meta title={product?.productId?.productName} />
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Card>

            <Divider />
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©2024 Your Company - All Rights Reserved
      </Footer>
    </Layout>
  );
};

export default UserProfile;
