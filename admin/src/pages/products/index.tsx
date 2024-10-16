import { memo } from "react";
import ProductsTable from "./ProductsTable";
import { useGetProductsQuery } from "../../store/api/product/product-api";
import { columns } from "./data";
import CreateEditDialogButton from "./product-dialog/OpenEditDialog";
import { MdAddCircleOutline } from "react-icons/md";

const Products = () => {
  const { data ,isLoading} = useGetProductsQuery();
  
  return (
    <>
      <CreateEditDialogButton icon={<MdAddCircleOutline />} buttonText="Create Product" type="primary"/>
      <ProductsTable loading={isLoading} data={data!} columns={columns} />
    </>
  );
};

export default memo(Products);
