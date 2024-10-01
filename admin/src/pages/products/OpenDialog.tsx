import { Button } from "antd";
import { useState } from "react";
import ProductDialog from "./ProductDialog";
import { MdAddCircleOutline } from "react-icons/md";
const XButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        style={{ marginBottom: "10px" }}
        type="primary"
        onClick={() => setOpen(true)}
      >
        <MdAddCircleOutline /> Create Product
      </Button>
      {open && <ProductDialog open setOpen={setOpen} />}
    </>
  );
};

export default XButton;
