import React from 'react';
import { Layout, Avatar, Typography, Row, Col, Card, Button, Divider, List } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const UserProfile = () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
    bio: 'Passionate about technology and design. Always eager to learn new things.',
    profileImageUrl: 'https://via.placeholder.com/150',
  };

  // Örnek sipariş verileri
  const orders = [
    {
      id: '1',
      productName: 'Florence Sosa',
      price: 132,
      date: '09.10.2024',
      status: 'Delivered',
    },
    {
      id: '2',
      productName: 'Elegant Ring',
      price: 99,
      date: '05.10.2024',
      status: 'Pending',
    },
  ];

  // Örnek favori ürünler
  const favorites = [
    {
      productName: 'Classic Necklace',
      price: 89,
      imageUrl: 'http://localhost:8000/public/images/classic_necklace.jpg',
    },
    {
      productName: 'Stylish Bracelet',
      price: 59,
      imageUrl: 'http://localhost:8000/public/images/stylish_bracelet.jpg',
    },
  ];

  // Örnek sepet bilgileri
  const cart = [
    {
      productName: 'Modern Watch',
      price: 150,
      quantity: 1,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '20px' }}>
        <Title level={2} style={{ margin: 0 }}>User Profile</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Row justify="center">
          <Col span={16}>
            <Card>
              <Row gutter={16}>
                <Col span={6} style={{ textAlign: 'center' }}>
                  <Avatar size={120} src={user.profileImageUrl} />
                  <Title level={4}>{user.name}</Title>
                </Col>
                <Col span={18}>
                  <Paragraph>
                    <strong>Email:</strong> {user.email}
                  </Paragraph>
                  <Paragraph>
                    <strong>Phone:</strong> {user.phone}
                  </Paragraph>
                  <Paragraph>
                    <strong>Bio:</strong> {user.bio}
                  </Paragraph>
                  <Divider />
                  <Button type="primary" style={{ marginRight: '10px' }}>
                    Edit Profile
                  </Button>
                  <Button type="default">Log Out</Button>
                </Col>
              </Row>
            </Card>

            <Divider />

            <Title level={3}>Orders</Title>
            <List
              itemLayout="horizontal"
              dataSource={orders}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href="#">{item.productName}</a>}
                    description={`Price: $${item.price} - Date: ${item.date} - Status: ${item.status}`}
                  />
                </List.Item>
              )}
            />

            <Divider />

            <Title level={3}>Favorites</Title>
            <Row gutter={16}>
              {favorites.map((item, index) => (
                <Col span={8} key={index}>
                  <Card
                    hoverable
                    cover={<img alt={item.productName} src={item.imageUrl} />}
                  >
                    <Card.Meta title={item.productName} description={`Price: $${item.price}`} />
                  </Card>
                </Col>
              ))}
            </Row>

            <Divider />

            <Title level={3}>Cart</Title>
            <List
              itemLayout="horizontal"
              dataSource={cart}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href="#">{item.productName}</a>}
                    description={`Price: $${item.price} - Quantity: ${item.quantity}`}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©2024 Your Company
      </Footer>
    </Layout>
  );
};

export default UserProfile;
