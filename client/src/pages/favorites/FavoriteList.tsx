import { FC } from "react";
import { Card, Image, Typography, Layout, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { FaMinus } from "react-icons/fa";

interface IFavoriteListProps {
  product: {
    productImg: string;
    productName: string;
    productPrice: string;
    productDiscountedPrice: string;
    productDetails: string;
    productId: number;
    stock: number;
    discount: number;
    favoritedDate?: string;
  };
}

const { Title, Text } = Typography;

const FavoriteList: FC<IFavoriteListProps> = ({ product }) => {
  return (
    <Content style={{ padding: "20px" }}>
      <Content
        style={{
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
          padding: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Content style={{ display: "flex", alignItems: "center" }}>
          <Image
            style={{
              width: "120px",
              height: "120px",
              marginRight: "20px",
              borderRadius: "8px",
            }}
            src={product.productImg}
            alt={product.productName}
            preview={false}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Title level={4}>{product.productName}</Title>
            <Text type="secondary">{product.productPrice}</Text>
            <Text type="secondary" style={{ marginTop: "5px" }}>
              {product.productDetails}
            </Text>
            <Text type="secondary" style={{ marginTop: "5px" }}>
              Creation Date: {product.favoritedDate || "N/A"}
            </Text>
          </div>
        </Content>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            style={{ marginRight: "10px" }}
          >
            Sepete Ekle
          </Button>
          <Button type="default">Detaylar</Button>
          <FaMinus style={{ marginLeft: "10px", cursor: "pointer" }} />
        </div>
      </Content>
    </Content>
  );
};

export default FavoriteList;
