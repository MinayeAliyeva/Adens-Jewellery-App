import { FC, useState } from "react";
import { ButtonComponent } from "../../components/ButtonComponent";
import { IProduct } from "../../store/api/product/modules";
import ProductDialog from "./ProductDialog";
interface IProductComponentProps {
  product: IProduct;
}
const OpenEditDialogButton: FC<IProductComponentProps> = ({ product }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ButtonComponent
        style={{ marginBottom: "10px" }}
        type="primary"
        buttonText="Edit"
        onClick={() => setOpen(true)}
      />
      {open && <ProductDialog product={product} open setOpen={setOpen} />}
    </>
  );
};

export default OpenEditDialogButton;