import { Modal, Typography, Avatar, Divider, Space, Button } from "antd";
import { FC, memo } from "react";

interface IProduct {
  productName: string;
  mainImageUrl: string;
  description: string;
  color: string;
  price: number;
}

interface IProductModalProps {
  selectedProduct: IProduct | null;
  isModalVisible: boolean;
  handleModalClose: () => void;
}

const ProductModal: FC<IProductModalProps> = ({
  selectedProduct,
  isModalVisible,
  handleModalClose,
}) => {
  return (
    <Modal
      title={
        <Typography.Title level={3} style={{ color: "#333", margin: 0 }}>
          {selectedProduct?.productName}
        </Typography.Title>
      }
      visible={isModalVisible}
      onCancel={handleModalClose}
      footer={null}
      bodyStyle={{
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      {selectedProduct && (
        <>
          <Avatar
            src={selectedProduct.mainImageUrl}
            size={150}
            shape="square"
            style={{
              marginBottom: "20px",
              borderRadius: "12px",
              border: "3px solid #1890ff",
            }}
          />
          <Typography.Paragraph style={{ fontSize: "16px", color: "#555" }}>
            <Typography.Text strong>Description:</Typography.Text>{" "}
            {selectedProduct.description}
          </Typography.Paragraph>
          <Divider style={{ borderColor: "#ddd" }} />
          <Space size="large" direction="vertical">
            <Typography.Text strong style={{ fontSize: "16px", color: "#444" }}>
              Color: {selectedProduct.color}
            </Typography.Text>
            <Typography.Text strong style={{ fontSize: "16px", color: "#444" }}>
              Price: ${selectedProduct.price}
            </Typography.Text>
          </Space>
          <Button
            type="primary"
            style={{
              marginTop: "30px",
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
              padding: "8px 20px",
              borderRadius: "25px",
              fontSize: "16px",
            }}
            onClick={handleModalClose}
          >
            Close
          </Button>
        </>
      )}
    </Modal>
  );
};

export default memo(ProductModal);
