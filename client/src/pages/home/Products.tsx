import { useGetProductsQuery } from "../../store/api/product/product-api";
import ProductCard from "../../components/ProductCard";
import { Layout, Typography } from "antd";

const Products = () => {
  const { data } = useGetProductsQuery();


  return (
    <>
      <Typography className="text-center text-3xl font-bold my-8">Our Collection</Typography>
      <Layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 p-5">
        {data?.map((product) => (
          <ProductCard key={product?.productName} product={product} />
        ))}
      </Layout>
    </>
  );
};

export default Products;
