import  { FC, useEffect, useMemo } from "react";
import { Table } from "antd";
import { useLazyGetProductsQuery } from "../../redux/api/product/product-api";
import { columns } from "./data";

const Products: FC = () => {
  const [getProducts, { data: productsData }] = useLazyGetProductsQuery();

  useEffect(() => {
    getProducts('');
  }, []);

  const tableColumns =useMemo(() => columns(), []);

  return (
      <Table
      style={{marginTop: "60px"}}
        columns={tableColumns}
        dataSource={productsData}
        rowKey="_id"
       pagination={{
        pageSize: 5
       }}
      />
  );
};

export default Products;
