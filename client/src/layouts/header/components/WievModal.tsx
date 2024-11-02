import { Avatar, Modal, Space, Typography } from "antd";
import { FC, memo } from "react";
import { IProduct } from "../../../redux/api/product/modules";
interface IWievModalProps {
  isModalVisible: boolean;
  selectedProduct: IProduct | null;
  onCloseSelectedProductInfoModal: () => void;
}
const WievModal: FC<IWievModalProps> = ({
  onCloseSelectedProductInfoModal,
  isModalVisible,
  selectedProduct,
}) => {
  return (
    <Modal
      width={750}
      height={500}
      onClose={onCloseSelectedProductInfoModal}
      onCancel={onCloseSelectedProductInfoModal}
      open={isModalVisible}
      footer={null}
    >
      {selectedProduct && (
        <>
          <Avatar
            src={selectedProduct?.mainImageUrl}
            size={400}
            shape="square"
            style={{
              marginBottom: "20px",
              borderRadius: "10px",
              border: "2px solid #1890ff",
              width: "100%",
              objectFit: "cover",
            }}
          />

          <Space size="middle" direction="vertical">
            <Typography.Text strong>
              Product Name: {selectedProduct?.productName}
            </Typography.Text>
            <Typography.Text strong>
              Description: {selectedProduct?.description}
            </Typography.Text>{" "}
            <Typography.Text strong>
              Color: {selectedProduct?.color}
            </Typography.Text>
            <Typography.Text strong>
              Price: ${selectedProduct?.price}
            </Typography.Text>
            <Typography.Text strong>
              Category: {selectedProduct?.category?.name}
            </Typography.Text>
            <Typography.Text strong>
              Brand: {selectedProduct?.brand?.name}
            </Typography.Text>
            <Typography.Text strong>
              size:{" "}
              {selectedProduct?.size?.map((size: string) =>
                Array.isArray(size) ? size?.split(",") : size
              )}
            </Typography.Text>
          </Space>
        </>
      )}
    </Modal>
  );
};

export default memo(WievModal);
