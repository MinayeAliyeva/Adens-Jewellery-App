import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { ButtonComponent } from "../../../utils/components/ButtonComponent";
import { IProduct } from "../../../store/api/product/modules";
import DeleteDialog from "./DeleteDialog";

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
        icon={<MdDelete/>}
        variant="dashed"
        color="danger"
      />
      {open && (
        <DeleteDialog
          open={open}
          setOpen={setOpen}
          product={product}
        />
      )}
    </>
  );
};

export default OpenDeleteDialogButton;