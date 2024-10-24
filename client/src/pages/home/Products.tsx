import { useGetProductsQuery } from "../../redux/api/product/product-api";
import ProductCard from "../../components/ProductCard";
import { Layout, Typography } from "antd";
import { IProduct } from "../../redux/api/product/modules";

const Products = () => {
  const { data } = useGetProductsQuery<{ data: IProduct[] }>("");
//  console.log('data',data);
 
  return (
    <>
      <Typography className="text-center text-3xl font-bold my-8 font-dancing-script ">
        OUR COLLECTION
      </Typography>
      <Layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 p-5">
        {data?.map?.((product: IProduct) => (
          <ProductCard key={product?.productName} product={product} />
        ))}
      </Layout>
    </>
  );
};

export default Products;
