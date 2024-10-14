import { Button, message, Statistic } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { EyeOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { FC, memo } from "react";
import { IProduct } from "../../../store/api/product/modules";

interface IProductInfoProps {
  product: IProduct;
}

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
      <Paragraph>{product?.description}</Paragraph>
      {product?.size && product?.size.length > 0 && (
        <Paragraph>
          <strong>Size:</strong> {product?.size.join(", ")}{" "}
          {/* Size dizisi olarak gösteriliyor */}
        </Paragraph>
      )}
      {product?.color && (
        <Paragraph>
          <strong>Color:</strong> {product?.color}
        </Paragraph>
      )}
      {product?.totalQty && (
        <Paragraph>
          <strong>Stock:</strong> {product?.totalQty}
        </Paragraph>
      )}
      {product?.weight && (
        <Paragraph>
          <strong>Weight:</strong> {product?.weight} kg
        </Paragraph>
      )}
      {product?.dimensions && (
        <Paragraph>
          <strong>Dimensions:</strong> {product?.dimensions}
        </Paragraph>
      )}
      {product?.warrantyDuration && (
        <Paragraph>
          <strong>Warranty Duration:</strong> {product?.warrantyDuration} years
        </Paragraph>
      )}
      {product?.brand && (
        <Paragraph>
          <strong>Brand:</strong> {product?.brand?.name}
        </Paragraph>
      )}
      {product?.creationDate && (
        <Paragraph>
          <strong>Creation Date:</strong>{" "}
          {new Date(product.creationDate).toLocaleDateString()}
        </Paragraph>
      )}
      //!API ile
      {/* Görüntülenme sayısı gösterme kısmı, isteğe bağlı
      {product?.view && (
        <div style={{ marginBottom: "20px" }}>
          <Statistic
            title="View Count"
            value={product?.view}
            prefix={<EyeOutlined style={{ color: "#1890ff" }} />}
            valueStyle={{ fontSize: "16px", fontWeight: "bold" }}
          />
        </div>
      )} */}
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
