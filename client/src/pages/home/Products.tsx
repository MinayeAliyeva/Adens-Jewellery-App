import { useGetProductsQuery } from "../../store/api/product/product-api";
import ProductCard from "./ProductCard";
const productImg1 = "/assets/images/product1.jpg";
const productImg2 = "/assets/images/carusel3.jpg";
const productImg3 = "/assets/images/carusel2.jpg";

const Products = () => {
  const { data } = useGetProductsQuery();


  return (
    <>
      <h1 className="text-center text-3xl font-bold my-8">Our Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 p-5">
        {data?.map((product) => (
          <ProductCard key={product?.productName} product={product} />
        ))}
      </div>
    </>
  );
};

export default Products;
