import { FC } from "react";
import { MdDelete } from "react-icons/md";
import { Modal, Row, Col, Typography, Divider, message } from "antd";
import { IProduct } from "../../../store/api/product/models";
import { useDeleteProductByIdMutation } from "../../../store/api/product/product-api";
import { ButtonComponent } from "../../../utils/components/ButtonComponent";

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
        message.success("Product delete!!!")
      });
    }
  };

  const toggleOpen = () => setOpen?.(false);

  return (
    <Modal
      title={
        <Typography.Title
          level={4}
          style={{
            color: "#1f1f1f", 
            textAlign: "center",
            fontWeight: 600, 
          }}
        >
          Delete Confirmation
        </Typography.Title>
      }
      centered
      open={open}
      onOk={toggleOpen}
      onCancel={toggleOpen}
      width={"500px"}
      style={{
        backgroundColor: "#ffffff", 
        padding: "20px",
        borderRadius: "10px", 
      }}
      footer={null}
    >
      <Typography.Paragraph
        style={{
          textAlign: "center",
          fontSize: "16px",
          color: "#595959", 
        }}
      >
        Are you sure you want to delete the product{" "}
        <strong style={{ color: "#faad14" }}> 
          "{product?.productName}"
        </strong>
        ? This action cannot be undone.
      </Typography.Paragraph>
      <Divider style={{ margin: "20px 0", borderColor: "#d9d9d9" }} />{" "}
      <Row justify="center" gutter={16} style={{ marginTop: 20 }}>
        <Col>
          <ButtonComponent
            variant="filled"
            color="primary"
            style={{
              borderColor: "#d9d9d9", 
              color: "#595959",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "16px",
            }}
            onClick={toggleOpen}
            buttonText="Cancel"
          />
        </Col>
        <Col>
          <ButtonComponent
            loading={isLoadingDeletedProduct}
            onClick={handleDelete}
            buttonText="Delete"
            danger
            icon={<MdDelete />}
            variant="filled"
            color="danger"
            style={{
              borderColor: "#ff4d4f", 
              color: "#ff4d4f",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default DeleteDialog;
