import CreateEditDialogButton from "./product-dialog/OpenCreateEditDialog";
import ProductsTable from "./ProductsTable";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { MdAddCircleOutline } from "react-icons/md";
import { useGetProductsQuery } from "../../store/api/product/product-api";
import { columns } from "./data";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const { t } = useTranslation();

  return (
    <>
      <CreateEditDialogButton
        icon={<MdAddCircleOutline />}
        buttonText={t("Create Product")}
        type="primary"
      />
      <ProductsTable loading={isLoading} data={data ?? []} columns={columns(t)} />
    </>
  );
};

export default memo(Products);
