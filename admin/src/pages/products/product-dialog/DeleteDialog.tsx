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
      title={
        <Typography.Title
          level={4}
          style={{
            color: "#1f1f1f", // Başlıkta koyu gri renk
            textAlign: "center",
            fontWeight: 600, // Kalın başlık
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
      bodyStyle={{
        backgroundColor: "#ffffff", // Temiz ve sade beyaz arka plan
        padding: "20px",
        borderRadius: "10px", // Modal köşeleri hafif yuvarlatıldı
      }}
      footer={null}
    >
      <Typography.Paragraph
        style={{
          textAlign: "center",
          fontSize: "16px",
          color: "#595959", // Daha açık gri metin
        }}
      >
        Are you sure you want to delete the product{" "}
        <strong style={{ color: "#faad14" }}> {/* Ürünün adı parlak turuncu */}
          "{product?.productName}"
        </strong>
        ? This action cannot be undone.
      </Typography.Paragraph>
      <Divider style={{ margin: "20px 0", borderColor: "#d9d9d9" }} />{" "}
      {/* Daha ince gri çizgi */}
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
