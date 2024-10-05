import { FC } from "react";
import { MdDelete } from "react-icons/md";
import { Modal, Row, Col, Typography, Divider } from "antd";
import { IProduct } from "../../../store/api/product/modules";
import { useDeleteProductByIdMutation } from "../../../store/api/product/product-api";
import { ButtonComponent } from "../../../components/ButtonComponent";

interface IProductDialog {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  product?: IProduct;
}

const DeleteDialog: FC<IProductDialog> = ({ open, setOpen, product }) => {
  const [deleteProductById, { isLoading: isLoadingDeletedProduct }] =
    useDeleteProductByIdMutation();

  const handleDelete = () => {
    if (product?._id) {
      deleteProductById(product._id).then(() => {
        setOpen?.(false);
      });
    }
  };

  const toggleOpen = () => setOpen?.(false);

  return (
    <Modal
      title="Delete Confirmation"
      centered
      open={open}
      onOk={toggleOpen}
      onCancel={toggleOpen}
      width={"800px"}
      style={{ minHeight: "460px" }}
      footer={null} 
    >
      <Typography.Paragraph>
        Are you sure you want to delete the product{" "}
        <strong>"{product?.productName}"</strong>? This action cannot be undone.
      </Typography.Paragraph>
      <Divider />

      <Row justify="end" style={{ marginTop: 20 }}>
        <Col>
          <ButtonComponent
            style={{ marginRight: 10 }}
            onClick={toggleOpen}
            buttonText="Cancel"
          />
          <ButtonComponent
            loading={isLoadingDeletedProduct}
            onClick={handleDelete}
            buttonText="Delete"
            danger
            icon={<MdDelete />}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default DeleteDialog;
