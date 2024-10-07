import { useState } from "react";
import { useLazyGetProductsQuery } from "../../store/api/product/product-api";
import ProductCard from "../../components/ProductCard";
import { Layout, Typography, Input, Button } from "antd";
import CatagoriesSlider from "./CatagoriesSlider";
import SelectBox from "./SelectBox";

const Shop = () => {
  // const [trigger, { data, isLoading, error }] = useLazyGetProductsQuery();
  const [categoryName, setCategoryName] = useState("");
  const [productName, setProductName] = useState("");

  // const handleFetchProducts = () => {
  //   trigger({ categoryName, productName }); 
  // };

  return (
    <>
      <CatagoriesSlider />

      {/* <div className="text-center mb-5">
        <Input
          placeholder="Kategori Adı"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="mr-2"
        />
        <Input
          placeholder="Ürün Adı"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="mr-2"
        />
        <Button onClick={handleFetchProducts} type="primary">
          Ürünleri Getir
        </Button>
      </div> */}
      <SelectBox/>
      {/* <Layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 p-5">
        {data?.map((product) => (
          <ProductCard key={product?.productName} product={product} />
        ))}
      </Layout> */}
    </>
  );
};

export default Shop;
