import { Button, message, Statistic } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { EyeOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { FC, memo } from "react";
import { IProduct } from "../../../store/api/product/modules";

interface IProductInfoProps {
  product: IProduct;
}
//! write view api and send req useParams id take view
const ProductInfo: FC<IProductInfoProps> = ({ product }) => {
  const handlePayment = () => {
    message.success("Payment process started successfully.");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={4}>{product?.productName}</Title>
      <Paragraph style={{ fontWeight: "bold", fontSize: "18px" }}>
        {`₺${product?.price}`} 
      </Paragraph>
      {/* <Paragraph>{product?.productDetails}</Paragraph> */}
      <Paragraph>{product?.description}</Paragraph>

      <Paragraph>
        <strong>Size:</strong> {product?.size?.join(", ")} 
      </Paragraph>
      <Paragraph>
        <strong>Color:</strong> {product?.color}
      </Paragraph>
      <Paragraph>
        <strong>Stock:</strong> {product?.stock}
      </Paragraph>
      <Paragraph>
        <strong>Weight:</strong> {product?.weight} kg
      </Paragraph>

      {/* <div style={{ marginBottom: "20px" }}>
        <Statistic
          title="View Count"
          value={product?.view}
          prefix={<EyeOutlined style={{ color: "#1890ff" }} />}
          valueStyle={{ fontSize: "16px", fontWeight: "bold" }}
        />
      </div> */}

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
        Make Payment
      </Button>
    </div>
  );
};

export default memo(ProductInfo);
