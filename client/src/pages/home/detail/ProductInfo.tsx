import { Button, message, Statistic } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { EyeOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { FC, memo } from "react";
interface IProduct {
  productImgGallery: string[];
  productName: string;
  productPrice: string;
  productDetails: string;
  productId: number;
  viewCount: number;
  comments?: {
    body: string;
    rating: number;
    username: string;
  }[];
}
interface IProductInfoProps {
  product: IProduct;
}
const ProductInfo: FC<IProductInfoProps> = ({ product }) => {
  const handlePayment = () => {
    message.success("Ödeme işlemi başarıyla başlatıldı.");
  };
  return (
    <div style={{ padding: "20px" }}>
      <Title level={4}>{product.productName}</Title>
      <Paragraph style={{ fontWeight: "bold", fontSize: "18px" }}>
        {product.productPrice}
      </Paragraph>
      <Paragraph>{product.productDetails}</Paragraph>
      <div style={{ marginBottom: "20px" }}>
        <Statistic
          title="Görüntüleme Sayısı"
          value={product.viewCount}
          prefix={<EyeOutlined style={{ color: "#1890ff" }} />}
          valueStyle={{ fontSize: "16px", fontWeight: "bold" }}
        />
      </div>
      <Button
        type="primary"
        icon={<DollarCircleOutlined />}
        onClick={handlePayment}
        size="large"
        style={{
          backgroundColor: "#52c41a",
          borderColor: "#52c41a",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: "bold",
        }}
      >
        Ödeme Yap
      </Button>
    </div>
  );
};

export default memo(ProductInfo);
