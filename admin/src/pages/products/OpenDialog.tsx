import { useState } from "react";
import ProductDialog from "./ProductDialog";
import { MdAddCircleOutline } from "react-icons/md";
import { ButtonComponent } from "../../components/ButtonComponent";
const OpenDialogButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ButtonComponent
        style={{ marginBottom: "10px" }}
        type="primary"
        buttonText="Create Product"
        icon={<MdAddCircleOutline />}
        onClick={() => setOpen(true)}
      />
      {open && <ProductDialog open setOpen={setOpen} />}
    </>
  );
};

export default OpenDialogButton;
