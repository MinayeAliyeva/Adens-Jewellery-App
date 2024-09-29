import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

interface ProductDetailsProps {
  name: string;
  price: string;
  details: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = React.memo(({ name, price, details }) => {
  return (
    <div style={{ padding: "20px" }}>
      <Title level={4}>{name}</Title>
      <Paragraph style={{ fontWeight: "bold", fontSize: "18px" }}>{price}</Paragraph>
      <Paragraph>{details}</Paragraph>
    </div>
  );
});

export default ProductDetails;
