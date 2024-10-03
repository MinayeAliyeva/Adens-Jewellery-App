import { useState } from "react";
import ProductDialog from "./ProductDialog";
import { ButtonComponent } from "../../components/ButtonComponent";
import { IProduct } from "../../store/api/product/modules";
import { useDeleteProductMutation } from "../../store/api/product/product-api";

interface OpenDeleteDialogButtonProps {
  product?: IProduct;
}

const OpenDeleteDialogButton: React.FC<OpenDeleteDialogButtonProps> = ({
  product,
}) => {
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleDeleteClick = () => {
    setIsDelete(true);
    setOpen(true);
  };

  return (
    <>
      <ButtonComponent
        style={{ marginBottom: "10px" }}
        danger
        type="primary"
        buttonText="Delete"
        onClick={handleDeleteClick}
      />
      {open && (
        <ProductDialog
          open={open}
          setOpen={setOpen}
          product={product}
          isDelete={isDelete}
        />
      )}
    </>
  );
};

export default OpenDeleteDialogButton;
