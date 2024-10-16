import { FC, memo, ReactNode, useState } from "react";
import { ButtonComponent } from "../../../utils/components/ButtonComponent";
import { IProduct } from "../../../store/api/product/modules";
import ProductDialog from "./ProductDialog";

interface IProductComponentProps {
  product?: IProduct;
  icon?: ReactNode;
  buttonText: string;
  variant?: "link" | "text" | "dashed" | "outlined" | "solid" | "filled";
  type?: "link" | "text" | "default" | "primary" | "dashed";
}
const CreateEditDialogButton: FC<IProductComponentProps> = ({
  product,
  buttonText,
  icon,
  variant,
  type,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ButtonComponent
        style={{ marginBottom: "10px" }}
        type={type}
        buttonText={buttonText}
        onClick={() => setOpen(true)}
        icon={icon}
        variant={variant}
      />
      <ProductDialog product={product} open={open} setOpen={setOpen} />
    </>
  );
};

export default memo(CreateEditDialogButton);
