import { FC } from "react";
import { MdDelete } from "react-icons/md";
import {
  Modal,
  Row,
  Col,
} from "antd";
import { IProduct } from "../../../store/api/product/modules";
import { useDeleteProductByIdMutation } from "../../../store/api/product/product-api";
import { ButtonComponent } from "../../../components/ButtonComponent";

interface IProductDialog {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  product?: IProduct;
  isDelete?: boolean;
}

const DeleteDialog: FC<IProductDialog> = ({
  open,
  setOpen,
  product,
}) => {
 
  const [deleteProductById, { isLoading: isLoadingDeletedProduct }] =
    useDeleteProductByIdMutation();
 

  const handleDelete = () => {
    deleteProductById(product?._id!).then((res) => {
      setOpen?.(false);
    });
  };



  const toggleOpen = () => setOpen?.(false)
  return (
    <Modal
      title="Are you sure delete ?"
      centered
      open={open}
      onOk={toggleOpen}
      onCancel={toggleOpen}
      width={"800px"}
      style={{minHeight: "460px"}}
      footer={ <Row justify="end" style={{ marginTop: 20 }}>
      <Col>
        <ButtonComponent
          style={{ marginRight: 10 }}
          onClick={toggleOpen}
          buttonText="    Cancel"
        />
        <ButtonComponent
          loading={isLoadingDeletedProduct}
          onClick={handleDelete}
          buttonText="Delete"
          danger
          icon={<MdDelete/>}
        />
      </Col>
    </Row>}
    />
  );
};

export default DeleteDialog;
