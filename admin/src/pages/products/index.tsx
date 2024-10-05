import ProductsTable from "./ProductsTable";
import { useGetProductsQuery } from "../../store/api/product/product-api";
import OpenDialogButton from "./OpenDialog";
import { columns } from "./data";

const Products = () => {
  const { data } = useGetProductsQuery();
  
  return (
    <>
      <OpenDialogButton />
      <ProductsTable data={data!} columns={columns} />
    </>
  );
};

export default Products;
